import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const KafkaSimContext = createContext();

export const useKafkaSimulation = () => {
  const context = useContext(KafkaSimContext);
  if (!context) {
    throw new Error('useKafkaSimulation must be used within a KafkaSimProvider');
  }
  return context;
};

export const KafkaSimProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [metrics, setMetrics] = useState({
    producerStatus: 'active',
    consumerStatus: 'active',
    latency: 2.3,
    messagesPerSecond: 12,
    topicsCount: 5
  });

  const topics = [
    'chaintrack.events.shipments',
    'chaintrack.events.qr_scans',
    'chaintrack.analytics.predictions',
    'chaintrack.analytics.anomalies',
    'chaintrack.events.status_updates'
  ];

  const eventTypes = [
    'QR_SCAN',
    'SHIPMENT_UPDATE',
    'ETA_PREDICTION',
    'ANOMALY_DETECTED',
    'STATUS_CHANGE',
    'AI_ANALYSIS',
    'QUALITY_CHECK'
  ];

  const generateEventId = () => {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const addEvent = useCallback((eventData) => {
    const event = {
      id: generateEventId(),
      timestamp: new Date().toISOString(),
      topic: eventData.topic || topics[Math.floor(Math.random() * topics.length)],
      eventType: eventData.eventType || eventTypes[Math.floor(Math.random() * eventTypes.length)],
      message: eventData.message,
      data: eventData.data || {},
      source: eventData.source || 'kafka-producer',
      consumer: eventData.consumer || 'ai-analytics-service'
    };

    setEvents(prev => [event, ...prev.slice(0, 99)]); // Keep last 100 events
    return event;
  }, []);

  const publishEvent = useCallback((eventType, data = {}) => {
    if (!isActive) return;

    const eventMessages = {
      QR_SCAN: `QR code scanned for Product #${data.productId || 'P' + Math.floor(Math.random() * 1000)}`,
      SHIPMENT_UPDATE: `Shipment status updated: ${data.status || 'IN_TRANSIT'}`,
      ETA_PREDICTION: `AI predicted ETA: ${data.eta || Math.floor(Math.random() * 24) + 'h ' + Math.floor(Math.random() * 60) + 'm'}`,
      ANOMALY_DETECTED: `Anomaly detected in ${data.location || 'Warehouse-' + Math.floor(Math.random() * 10)}`,
      STATUS_CHANGE: `Product status changed to ${data.newStatus || 'DELIVERED'}`,
      AI_ANALYSIS: `AI analysis completed with ${data.confidence || Math.floor(Math.random() * 20) + 80}% confidence`,
      QUALITY_CHECK: `Quality check ${data.result || 'PASSED'} for batch ${data.batchId || 'B' + Math.floor(Math.random() * 1000)}`
    };

    const event = addEvent({
      eventType,
      message: eventMessages[eventType] || `Event: ${eventType}`,
      topic: data.topic,
      data,
      source: data.source
    });

    // Simulate processing delay
    setTimeout(() => {
      setMetrics(prev => ({
        ...prev,
        latency: Math.random() * 2 + 1.5,
        messagesPerSecond: Math.floor(Math.random() * 10) + 8
      }));
    }, 100);

    return event;
  }, [isActive, addEvent]);

  // Simulate background Kafka activity
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const randomEvents = [
        'SHIPMENT_UPDATE',
        'AI_ANALYSIS',
        'QUALITY_CHECK'
      ];
      
      const eventType = randomEvents[Math.floor(Math.random() * randomEvents.length)];
      publishEvent(eventType, { source: 'background-service' });
    }, 5000 + Math.random() * 10000); // Random interval between 5-15 seconds

    return () => clearInterval(interval);
  }, [isActive, publishEvent]);

  const value = {
    events,
    metrics,
    topics,
    isActive,
    setIsActive,
    publishEvent,
    addEvent
  };

  return (
    <KafkaSimContext.Provider value={value}>
      {children}
    </KafkaSimContext.Provider>
  );
};