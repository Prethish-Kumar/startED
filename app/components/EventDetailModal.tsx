import { useRef, useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';

type EventDetailModalProps = {
  visible: boolean;
  onClose: () => void;
  eventName: string;
  venue: string;
  date: string;
  timings: string;
  description: string;
  color: string;
  month: string;
  day: string;
};

export default function EventDetailModal({
  visible,
  onClose,
  eventName,
  venue,
  date,
  timings,
  description,
  color,
  month,
  day,
}: EventDetailModalProps) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  const confettiRef = useRef<any>(null);

  const handleRegister = () => {
    setIsRegistered(true);
    // Trigger confetti animation
    confettiRef.current?.start();
    console.log(`Registered for: ${eventName}`);

    // Auto close after celebration
    setTimeout(() => {
      onClose();
      // Reset states after modal closes
      setTimeout(() => {
        setIsRegistered(false);
      }, 300);
    }, 2500);
  };

  const handleInterested = () => {
    setIsInterested(true);
    console.log(`Marked interested: ${eventName}`);

    // Auto close after a moment
    setTimeout(() => {
      onClose();
      // Reset states after modal closes
      setTimeout(() => {
        setIsInterested(false);
      }, 300);
    }, 1000);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Event Details</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Date Badge */}
          <View style={styles.dateSection}>
            <View style={[styles.dateBadge, { backgroundColor: color }]}>
              <Text style={styles.dateMonth}>{month}</Text>
              <Text style={styles.dateDay}>{day}</Text>
            </View>
          </View>

          {/* Event Info */}
          <Text style={styles.eventName}>{eventName}</Text>

          <View style={styles.infoRow}>
            <Ionicons name="location" size={20} color="#0057FF" />
            <Text style={styles.infoText}>{venue}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="time" size={20} color="#0057FF" />
            <Text style={styles.infoText}>{timings}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="calendar" size={20} color="#0057FF" />
            <Text style={styles.infoText}>{date}</Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionTitle}>About this event</Text>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>

          {/* Additional Info */}
          <View style={styles.additionalInfo}>
            <Text style={styles.additionalInfoTitle}>What to bring</Text>
            <Text style={styles.additionalInfoText}>
              • Student ID card{'\n'}
              • Water bottle{'\n'}
              • Notebook and pen{'\n'}
              • Enthusiasm and curiosity!
            </Text>
          </View>

          {/* Success Messages */}
          {isRegistered && (
            <View style={styles.successMessage}>
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              <Text style={styles.successText}>
                Successfully registered! See you there! 🎉
              </Text>
            </View>
          )}

          {isInterested && (
            <View style={styles.successMessage}>
              <Ionicons name="heart" size={24} color="#FF3B30" />
              <Text style={styles.successText}>
                Marked as interested! We'll remind you.
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Action Buttons */}
        {!isRegistered && !isInterested && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.interestedButton}
              onPress={handleInterested}
            >
              <Ionicons name="heart-outline" size={20} color="#0057FF" />
              <Text style={styles.interestedButtonText}>Interested</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>Register Now</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Confetti */}
        <ConfettiCannon
          ref={confettiRef}
          count={150}
          origin={{ x: -10, y: 0 }}
          autoStart={false}
          fadeOut={true}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dateSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dateBadge: {
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateMonth: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0057FF',
    textTransform: 'uppercase',
  },
  dateDay: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0057FF',
  },
  eventName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  descriptionSection: {
    marginTop: 24,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  additionalInfo: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  additionalInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  additionalInfoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9f0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  successText: {
    fontSize: 15,
    color: '#2E7D32',
    marginLeft: 12,
    flex: 1,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,
  },
  interestedButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#0057FF',
    gap: 8,
  },
  interestedButtonText: {
    color: '#0057FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    flex: 1,
    backgroundColor: '#0057FF',
    paddingVertical: 14,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
