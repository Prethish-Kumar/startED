import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type EventCardProps = {
  id: string;
  eventName: string;
  venue: string;
  date: string;
  month: string;
  day: string;
  timings: string;
  description: string;
  color: string;
  onRegister: () => void;
};

export default function EventCard({
  eventName,
  venue,
  month,
  day,
  timings,
  description,
  color,
  onRegister,
}: EventCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.dateBox, { backgroundColor: color }]}>
        <Text style={styles.month}>{month}</Text>
        <Text style={styles.day}>{day}</Text>
      </View>

      <View style={styles.eventInfo}>
        <Text style={styles.eventName}>{eventName}</Text>
        <Text style={styles.venueTimings}>
          {venue} • {timings}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <TouchableOpacity style={styles.registerButton} onPress={onRegister}>
          <Text style={styles.registerButtonText}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  dateBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  month: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0057FF',
    textTransform: 'uppercase',
  },
  day: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0057FF',
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  venueTimings: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: '#888',
    lineHeight: 18,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#0057FF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
