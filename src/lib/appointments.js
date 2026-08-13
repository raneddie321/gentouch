const APPOINTMENTS_KEY = 'dudu_appointments_v1';
const AVAILABILITY_KEY = 'dudu_daily_availability_v1';

export const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export function getIsraelTimestamp(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Jerusalem',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date).reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});

  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`,
    display: `${parts.day}.${parts.month}.${parts.year} ${parts.hour}:${parts.minute}`,
  };
}

export function formatIsraelDateTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('he-IL', {
    timeZone: 'Asia/Jerusalem',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function getAppointments() {
  if (typeof window === 'undefined') return [];
  return safeParse(window.localStorage.getItem(APPOINTMENTS_KEY), [])
    .filter(Boolean)
    .sort((a, b) => new Date(b.created_date || 0) - new Date(a.created_date || 0));
}

export function createAppointment(appointment) {
  if (typeof window === 'undefined') return appointment;

  const appointments = getAppointments();
  const now = new Date();
  const israelTimestamp = getIsraelTimestamp(now);
  const saved = {
    ...appointment,
    id: appointment.id || `appt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: appointment.status || 'ממתין',
    created_date: appointment.created_date || now.toISOString(),
    order_received_date: appointment.order_received_date || israelTimestamp.date,
    order_received_time: appointment.order_received_time || israelTimestamp.time,
    order_received_display: appointment.order_received_display || israelTimestamp.display,
  };

  window.localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify([saved, ...appointments]));
  return saved;
}

export function updateAppointmentStatus(id, status) {
  if (typeof window === 'undefined') return [];
  const appointments = getAppointments().map((appointment) =>
    appointment.id === id ? { ...appointment, status } : appointment
  );
  window.localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  return appointments;
}

export function getAllAvailability() {
  if (typeof window === 'undefined') return {};
  return safeParse(window.localStorage.getItem(AVAILABILITY_KEY), {});
}

export function getDayAvailability(date) {
  if (!date) return { closed: false, unavailableSlots: [] };
  const allAvailability = getAllAvailability();
  return {
    closed: Boolean(allAvailability[date]?.closed),
    unavailableSlots: Array.isArray(allAvailability[date]?.unavailableSlots)
      ? allAvailability[date].unavailableSlots
      : [],
  };
}

export function saveDayAvailability(date, availability) {
  if (typeof window === 'undefined' || !date) return {};
  const allAvailability = getAllAvailability();
  const nextAvailability = {
    ...allAvailability,
    [date]: {
      closed: Boolean(availability.closed),
      unavailableSlots: availability.unavailableSlots || [],
    },
  };
  window.localStorage.setItem(AVAILABILITY_KEY, JSON.stringify(nextAvailability));
  return nextAvailability[date];
}

export function isSlotBooked(date, time) {
  return getAppointments().some(
    (appointment) =>
      appointment.date === date &&
      appointment.time === time
  );
}

export function getSlotState(date, time) {
  const dayAvailability = getDayAvailability(date);

  if (!date) return { available: false, reason: 'בחרו תאריך קודם' };
  if (dayAvailability.closed) return { available: false, reason: 'לא זמין' };
  if (dayAvailability.unavailableSlots.includes(time)) return { available: false, reason: 'לא זמין' };
  if (isSlotBooked(date, time)) return { available: false, reason: 'תפוס' };

  return { available: true, reason: 'פנוי' };
}
