
import { 
  HealthLakeClient, 
  StartFHIRImportJobCommand,
  StartFHIRExportJobCommand,
  SearchFHIRResourcesCommand,
  ServiceOutputTypes 
} from '@aws-sdk/client-healthlake';

interface FHIRResource {
  resourceType: string;
  id?: string;
  [key: string]: any;
}

interface ExportFHIRDataResult {
  JobId: string;
  Status: string;
}

interface ImportFHIRDataResult {
  JobId: string;
  Status: string;
}

interface SearchFHIRResourcesResult {
  Resources: FHIRResource[];
}

class HealthLakeService {
  private isMock: boolean;
  private client: HealthLakeClient | null;
  private datastoreId: string;

  constructor() {
    // Mock implementation for local development
    this.isMock = process.env.NODE_ENV !== 'production';
    this.client = null;
    this.datastoreId = process.env.HEALTHLAKE_DATASTORE_ID || 'mock-datastore';
    
    if (!this.isMock) {
      this.client = new HealthLakeClient({
        region: process.env.AWS_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
        }
      });
    }
  }

  async exportFHIRData(dataType: string, startDate: Date, endDate: Date): Promise<ExportFHIRDataResult> {
    console.log('Exporting FHIR data', { dataType, startDate, endDate });
    
    if (this.isMock) {
      return {
        JobId: 'mock-job-id',
        Status: 'COMPLETED'
      };
    }

    const command = new StartFHIRExportJobCommand({
      DatastoreId: this.datastoreId,
      OutputDataConfig: {
        S3Configuration: {
          S3Uri: process.env.S3_EXPORT_URI,
          KmsKeyId: process.env.KMS_KEY_ID
        }
      },
      DataAccessRoleArn: process.env.DATA_ACCESS_ROLE_ARN,
    });

    try {
      const response = await this.client?.send(command);
      return {
        JobId: response?.JobId || 'unknown',
        Status: 'SUBMITTED'
      };
    } catch (error) {
      console.error('Error exporting FHIR data:', error);
      throw error;
    }
  }

  async importFHIRData(dataType: string, s3Uri: string): Promise<ImportFHIRDataResult> {
    console.log('Importing FHIR data', { dataType, s3Uri });
    
    if (this.isMock) {
      return {
        JobId: 'mock-job-id',
        Status: 'COMPLETED'
      };
    }

    const command = new StartFHIRImportJobCommand({
      DatastoreId: this.datastoreId,
      InputDataConfig: {
        S3Uri: s3Uri
      },
      DataAccessRoleArn: process.env.DATA_ACCESS_ROLE_ARN,
      JobOutputDataConfig: {
        S3Configuration: {
          S3Uri: process.env.S3_IMPORT_OUTPUT_URI,
          KmsKeyId: process.env.KMS_KEY_ID
        }
      }
    });

    try {
      const response = await this.client?.send(command);
      return {
        JobId: response?.JobId || 'unknown',
        Status: 'SUBMITTED'
      };
    } catch (error) {
      console.error('Error importing FHIR data:', error);
      throw error;
    }
  }

  async searchFHIRResources(resourceType: string, query: Record<string, any>): Promise<SearchFHIRResourcesResult> {
    console.log('Searching FHIR resources', { resourceType, query });
    
    if (this.isMock) {
      return {
        Resources: []
      };
    }

    const searchParameter = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const command = new SearchFHIRResourcesCommand({
      DatastoreId: this.datastoreId,
      ResourceType: resourceType,
      SearchParams: searchParameter
    });

    try {
      const response = await this.client?.send(command);
      
      let resources: FHIRResource[] = [];
      
      if (response) {
        // Since the exact structure of the response may vary, we need to handle multiple formats
        if (typeof response === 'object') {
          // Handle case where response is a JSON string that needs parsing
          if (response.Results && typeof response.Results === 'string') {
            try {
              const parsed = JSON.parse(response.Results);
              
              // Handle different possible structures of the parsed JSON
              if (parsed.entry && Array.isArray(parsed.entry)) {
                resources = parsed.entry.map((entry: any) => entry.resource || entry);
              } else if (Array.isArray(parsed)) {
                resources = parsed;
              } else if (parsed.resourceType) {
                resources = [parsed];
              }
            } catch (parseError) {
              console.error('Error parsing Results:', parseError);
            }
          } 
          // Handle case where response already has parsed resources
          else if (response.Resources && Array.isArray(response.Resources)) {
            resources = response.Resources;
          }
          // Handle case where the response itself might be an array
          else if (Array.isArray(response)) {
            resources = response;
          }
        }
      }
      
      return {
        Resources: resources
      };
    } catch (error) {
      console.error('Error searching FHIR resources:', error);
      throw error;
    }
  }

  convertPatientToFHIR(patient: any): FHIRResource {
    return {
      resourceType: 'Patient',
      id: patient._id,
      identifier: patient.identifier,
      active: patient.active,
      name: patient.name.map((n: any) => ({
        use: n.use,
        family: n.family,
        given: n.given
      })),
      gender: patient.gender,
      birthDate: patient.birthDate?.toISOString().split('T')[0],
      extension: [
        {
          url: 'http://adhd-bridge-nexus.org/fhir/StructureDefinition/adhd-diagnosis',
          valueCodeableConcept: {
            coding: [{
              system: 'http://adhd-bridge-nexus.org/fhir/CodeSystem/adhd-types',
              code: patient.diagnosis,
              display: patient.diagnosis
            }]
          }
        },
        {
          url: 'http://adhd-bridge-nexus.org/fhir/StructureDefinition/adhd-severity',
          valueCodeableConcept: {
            coding: [{
              system: 'http://adhd-bridge-nexus.org/fhir/CodeSystem/severity',
              code: patient.severity.toLowerCase(),
              display: patient.severity
            }]
          }
        }
      ]
    };
  }

  convertFocusScoreToFHIR(patientId: string, focusScore: any): FHIRResource {
    return {
      resourceType: 'Observation',
      status: 'final',
      code: {
        coding: [{
          system: 'http://adhd-bridge-nexus.org/fhir/CodeSystem/focus-score',
          code: 'focus-score',
          display: 'ADHD Focus Score'
        }]
      },
      subject: {
        reference: `Patient/${patientId}`
      },
      effectiveDateTime: focusScore.timestamp?.toISOString(),
      valueQuantity: {
        value: focusScore.score,
        unit: 'score',
        system: 'http://adhd-bridge-nexus.org/fhir/CodeSystem/focus-score-units',
        code: 'score'
      },
      note: [{
        text: focusScore.notes
      }],
      component: focusScore.environmentalFactors ? [
        {
          code: {
            coding: [{
              system: 'http://adhd-bridge-nexus.org/fhir/CodeSystem/environmental-factors',
              code: 'location',
              display: 'Location'
            }]
          },
          valueString: focusScore.environmentalFactors.location
        },
        {
          code: {
            coding: [{
              system: 'http://adhd-bridge-nexus.org/fhir/CodeSystem/environmental-factors',
              code: 'noise',
              display: 'Noise Level'
            }]
          },
          valueString: focusScore.environmentalFactors.noise
        },
        {
          code: {
            coding: [{
              system: 'http://adhd-bridge-nexus.org/fhir/CodeSystem/environmental-factors',
              code: 'sleep-quality',
              display: 'Sleep Quality'
            }]
          },
          valueQuantity: {
            value: focusScore.environmentalFactors.sleepQuality,
            unit: 'score',
            system: 'http://adhd-bridge-nexus.org/fhir/CodeSystem/sleep-quality-units',
            code: 'score'
          }
        }
      ] : []
    };
  }
}

export default new HealthLakeService();
