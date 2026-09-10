
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors, typography } from '../../styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { fetchFocusScores, recordFocusScore, selectFocusScores, selectCurrentFocusScore } from '../../store/slices/monitoringSlice';
import { RootState } from '../../store';
import HealthLakeService from '../../services/HealthLakeService';

const screenWidth = Dimensions.get('window').width - 32; // Adjust for padding

const MonitoringScreen = () => {
  const dispatch = useDispatch();
  const focusScores = useSelector(selectFocusScores);
  const currentFocusScore = useSelector(selectCurrentFocusScore);
  const isLoading = useSelector((state: RootState) => state.monitoring.isLoading);
  
  const [realTimeData, setRealTimeData] = useState({
    heartRate: 72,
    sleepQuality: 85,
    screenTime: 4.2,
    stepsToday: 5430,
    isStreaming: false
  });
  
  const [healthData, setHealthData] = useState({
    isLoading: false,
    hasAuthorized: false,
    lastSynced: null as Date | null,
  });

  useEffect(() => {
    // @ts-ignore - Dispatch type error can be ignored for this demo
    dispatch(fetchFocusScores());
    
    // Simulate real-time data updates
    const interval = setInterval(() => {
      if (realTimeData.isStreaming) {
        setRealTimeData(prev => ({
          ...prev,
          heartRate: prev.heartRate + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3),
          stepsToday: prev.stepsToday + Math.floor(Math.random() * 50)
        }));
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [dispatch, realTimeData.isStreaming]);

  const handleRecordFocusScore = (score: number) => {
    // @ts-ignore - Dispatch type error can be ignored for this demo
    dispatch(recordFocusScore({ score }));
  };
  
  const toggleDataStream = () => {
    setRealTimeData(prev => ({
      ...prev,
      isStreaming: !prev.isStreaming
    }));
  };
  
  const syncHealthData = async () => {
    setHealthData(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulate FHIR data integration with AWS HealthLake
      await HealthLakeService.searchFHIRResources('Patient', { identifier: 'current-user' });
      
      setHealthData({
        isLoading: false,
        hasAuthorized: true,
        lastSynced: new Date()
      });
      
      // Update some real-time data based on "synced" health data
      setRealTimeData(prev => ({
        ...prev,
        sleepQuality: 78,
        screenTime: 5.1
      }));
    } catch (error) {
      console.error('Error syncing health data:', error);
      setHealthData({
        isLoading: false,
        hasAuthorized: false,
        lastSynced: null
      });
    }
  };

  // Prepare chart data from focus scores
  const chartData = {
    labels: focusScores.slice(0, 7).map((_, index) => `Day ${index + 1}`).reverse(),
    datasets: [
      {
        data: focusScores.slice(0, 7).map(score => score.score).reverse(),
        color: () => colors.primary,
        strokeWidth: 2
      }
    ],
    legend: ['Focus Scores']
  };

  if (isLoading && focusScores.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading your monitoring data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Monitoring</Text>
      
      {/* Focus Score Tracker */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Focus Score Tracker</Text>
        <View style={styles.focusScoreContainer}>
          <View style={styles.focusScoreCircle}>
            <Text style={styles.focusScoreText}>{currentFocusScore || '—'}</Text>
            <Text style={styles.focusScoreLabel}>Current Score</Text>
          </View>
          
          <View style={styles.focusScoreButtons}>
            <Text style={styles.focusPrompt}>Rate your focus today:</Text>
            <View style={styles.buttonRow}>
              {[1, 2, 3, 4, 5].map((score) => (
                <TouchableOpacity
                  key={score}
                  style={styles.scoreButton}
                  onPress={() => handleRecordFocusScore(score)}
                >
                  <Text style={styles.scoreButtonText}>{score}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.buttonRow}>
              {[6, 7, 8, 9, 10].map((score) => (
                <TouchableOpacity
                  key={score}
                  style={styles.scoreButton}
                  onPress={() => handleRecordFocusScore(score)}
                >
                  <Text style={styles.scoreButtonText}>{score}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        
        {focusScores.length > 0 && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Focus Score Trend</Text>
            <LineChart
              data={chartData}
              width={screenWidth - 32}
              height={220}
              chartConfig={{
                backgroundColor: colors.background,
                backgroundGradientFrom: colors.background,
                backgroundGradientTo: colors.background,
                decimalPlaces: 0,
                color: () => colors.primary,
                labelColor: () => colors.textSecondary,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: colors.primaryDark,
                },
              }}
              bezier
              style={styles.chart}
            />
          </View>
        )}
      </View>
      
      {/* Real-Time Health Data - Stream Processing */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Real-Time Health Data</Text>
          <View style={styles.streamStatus}>
            <View style={[styles.streamIndicator, realTimeData.isStreaming ? styles.streamActive : styles.streamInactive]} />
            <Text style={styles.streamStatusText}>
              {realTimeData.isStreaming ? 'Streaming' : 'Paused'}
            </Text>
          </View>
        </View>
        
        <Text style={styles.sectionSubtitle}>
          Stream processing for wearable device data and real-time analytics
        </Text>
        
        <View style={styles.dataGrid}>
          <View style={styles.dataItem}>
            <Text style={styles.dataValue}>{realTimeData.heartRate}</Text>
            <Text style={styles.dataLabel}>Heart Rate</Text>
          </View>
          
          <View style={styles.dataItem}>
            <Text style={styles.dataValue}>{realTimeData.sleepQuality}%</Text>
            <Text style={styles.dataLabel}>Sleep Quality</Text>
          </View>
          
          <View style={styles.dataItem}>
            <Text style={styles.dataValue}>{realTimeData.screenTime}h</Text>
            <Text style={styles.dataLabel}>Screen Time</Text>
          </View>
          
          <View style={styles.dataItem}>
            <Text style={styles.dataValue}>{realTimeData.stepsToday.toLocaleString()}</Text>
            <Text style={styles.dataLabel}>Steps Today</Text>
          </View>
        </View>
        
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity
            style={[styles.actionButton, realTimeData.isStreaming ? styles.stopButton : styles.startButton]}
            onPress={toggleDataStream}
          >
            <Text style={styles.actionButtonText}>
              {realTimeData.isStreaming ? 'Pause Stream' : 'Start Stream'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* FHIR Healthcare Integration */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>FHIR-Compliant Healthcare Integration</Text>
        <Text style={styles.sectionSubtitle}>
          AWS HealthLake secure and standardized healthcare data exchange
        </Text>
        
        <View style={styles.healthIntegrationStatus}>
          <Text style={styles.healthStatusText}>
            Status: {healthData.hasAuthorized ? 'Connected' : 'Not Connected'}
          </Text>
          {healthData.lastSynced && (
            <Text style={styles.healthStatusText}>
              Last synced: {healthData.lastSynced.toLocaleTimeString()}
            </Text>
          )}
        </View>
        
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.healthSyncButton]}
            onPress={syncHealthData}
            disabled={healthData.isLoading}
          >
            {healthData.isLoading ? (
              <ActivityIndicator size="small" color={colors.textOnPrimary} />
            ) : (
              <Text style={styles.actionButtonText}>
                {healthData.hasAuthorized ? 'Sync Health Data' : 'Connect Health Provider'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        
        {healthData.hasAuthorized && (
          <View style={styles.connectedProvidersContainer}>
            <Text style={styles.connectedProvidersTitle}>Connected Providers:</Text>
            <View style={styles.providerItem}>
              <Text style={styles.providerName}>Primary Care - Dr. Smith</Text>
              <Text style={styles.providerDetails}>Last update: 3 days ago</Text>
            </View>
            <View style={styles.providerItem}>
              <Text style={styles.providerName}>Psychiatry - Dr. Johnson</Text>
              <Text style={styles.providerDetails}>Last update: Today</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  heading: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    ...typography.body1,
    color: colors.textSecondary,
    marginTop: 12,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  focusScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  focusScoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  focusScoreText: {
    ...typography.h1,
    color: colors.textOnPrimary,
  },
  focusScoreLabel: {
    ...typography.caption,
    color: colors.textOnPrimary,
  },
  focusScoreButtons: {
    flex: 1,
  },
  focusPrompt: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  scoreButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreButtonText: {
    ...typography.subtitle2,
    color: colors.textOnPrimary,
  },
  chartContainer: {
    marginTop: 16,
  },
  chartTitle: {
    ...typography.subtitle1,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  sectionSubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  dataGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dataItem: {
    width: '48%',
    backgroundColor: colors.surfaceVariant,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  dataValue: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: 4,
  },
  dataLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  streamStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streamIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  streamActive: {
    backgroundColor: colors.success,
  },
  streamInactive: {
    backgroundColor: colors.textDisabled,
  },
  streamStatusText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  actionButtonContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  startButton: {
    backgroundColor: colors.success,
  },
  stopButton: {
    backgroundColor: colors.warning,
  },
  healthSyncButton: {
    backgroundColor: colors.primary,
  },
  actionButtonText: {
    ...typography.button,
    color: colors.textOnPrimary,
  },
  healthIntegrationStatus: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  healthStatusText: {
    ...typography.body2,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  connectedProvidersContainer: {
    marginTop: 16,
  },
  connectedProvidersTitle: {
    ...typography.subtitle1,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  providerItem: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    paddingLeft: 12,
    marginBottom: 12,
  },
  providerName: {
    ...typography.subtitle2,
    color: colors.textPrimary,
  },
  providerDetails: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

export default MonitoringScreen;
