// 1. Inicializar cliente Supabase
const SUPABASE_URL = 'https://hetqsuggbaygqvrdscdq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_66mZf73CWOIxxQkpdCV-8w_uSHP206H';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Función que se llama al confirmar la reserva
async function agendarCitaDesdeWeb(evento) {
    if (evento) evento.preventDefault();

    // Obtener los datos del formulario de tu web
    const nombreCliente = document.getElementById('nombre').value;
    const telefonoCliente = document.getElementById('telefono').value;
    const servicioCorte = document.getElementById('servicio').value; // ej: "Degradado + Barba"
    const precioCorte = parseFloat(document.getElementById('precio').value || 0);
    const fecha = document.getElementById('fecha').value; // ej: "2026-09-20"
    const hora = document.getElementById('hora').value;   // ej: "16:30"
    
    // Nombre del barbero (debe coincidir con el usuario en la app Android)
    const barbero = "esteban"; // o el selector del barbero si el cliente lo elige

    // 3. Enviar a la tabla 'citas' en Supabase
    const { data, error } = await supabase
        .from('citas')
        .insert([
            {
                barber_username: barbero,       // Identificador del barbero
                client_name: nombreCliente,      // Nombre del cliente
                client_phone: telefonoCliente,   // Teléfono / WhatsApp
                cut_type: servicioCorte,         // Tipo de corte o servicio
                price: precioCorte,              // Precio
                appointment_date: fecha,         // Fecha
                appointment_time: hora           // Hora
            }
        ]);

    if (error) {
        console.error('Error al agendar cita:', error.message);
        alert('Hubo un problema al agendar tu cita: ' + error.message);
    } else {
        alert('¡Cita agendada con éxito! Tu barbero ha recibido la notificación.');
        // Opcional: resetear formulario o mostrar modal de confirmación
    }
}
