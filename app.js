// 1. Inicializar cliente de Supabase con tus credenciales
const SUPABASE_URL = 'https://TU-PROYECTO.supabase.co';
const SUPABASE_ANON_KEY = 'TU_SUPABASE_ANON_KEY';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Escuchar el envío del formulario de reserva
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form'); // Asegúrate de que este ID coincida con tu HTML

    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
});

async function handleBookingSubmit(event) {
    event.preventDefault();

    // Obtener botón y mostrar estado de carga
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = 'Agendando...';
    submitBtn.disabled = true;

    // 3. Capturar valores de los campos de tu formulario HTML
    const barberUsername = document.getElementById('barber-select').value; // Ej: "esteban"
    const clientName = document.getElementById('client-name').value;
    const clientPhone = document.getElementById('client-phone').value;
    const cutType = document.getElementById('service-select').value;
    const price = parseFloat(document.getElementById('service-price').value || 0);
    const appointmentDate = document.getElementById('appointment-date').value; // Formato YYYY-MM-DD
    const appointmentTime = document.getElementById('appointment-time').value; // Formato HH:mm

    try {
        // 4. Insertar la nueva cita en la tabla "citas" de Supabase
        const { data, error } = await supabase
            .from('citas')
            .insert([
                {
                    barber_username: barberUsername,
                    client_name: clientName,
                    client_phone: clientPhone,
                    cut_type: cutType,
                    price: price,
                    appointment_date: appointmentDate,
                    appointment_time: appointmentTime
                }
            ]);

        if (error) throw error;

        // Éxito: Notificar al cliente y reiniciar formulario
        alert('¡Cita agendada con éxito! El barbero ha sido notificado.');
        event.target.reset();

    } catch (error) {
        console.error('Error al agendar la cita:', error.message);
        alert('Hubo un problema al agendar tu cita. Por favor intenta de nuevo.');
    } finally {
        // Restaurar estado del botón
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
    }
}