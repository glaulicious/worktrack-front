import { http, HttpResponse } from 'msw';

// Usá la misma base que tenés en VITE_API_URL (ej: http://localhost:3000)
// MSW intercepta por path, así que esto matchea independientemente del host.

export const handlers = [
  // ---------- MÓDULO 0: AUTENTICACIÓN ----------
  http.post('*/api/v1/auth/login', async ({ request }) => {
    const { email, password } = await request.json();

    if (email === 'adm@worktrack.com' && password === '12345') {
      return HttpResponse.json({
        status: 'success',
        mensaje: 'Autenticación exitosa.',
        data: {
          usuario: {
            id_usuario: 3,
            nombre: 'Mariano',
            apellido: 'Cristaldo',
            email: 'mariano.adm@worktrack.com',
            rol: 'Administrador',
          },
          token_acceso: 'mock.jwt.token',
          expira_en_segundos: 28800,
        },
      });
    }

    return HttpResponse.json(
      {
        status: 'error',
        codigo: 'AUTH_INVALID_CREDENTIALS',
        mensaje: 'El correo electrónico o la contraseña son incorrectos.',
      },
      { status: 401 }
    );
  }),

  // ---------- MÓDULO 1: INGRESO DE OT ----------
  http.post('*/api/v1/ordenes', async () => {
    return HttpResponse.json(
      {
        status: 'success',
        mensaje: 'Orden de Trabajo registrada correctamente.',
        data: {
          id_ot: 1024,
          codigo_seguimiento: 'OT-2026-A1024',
          estado_inicial: 'Ingresado',
          fecha_creacion: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  }),

  // ---------- MÓDULO 2: TALLER / TÉCNICOS ----------
  http.get('*/api/v1/tecnicos/:idTecnico/tareas', () => {
    return HttpResponse.json([
      {
        id_ot: 1024,
        codigo_seguimiento: 'OT-2026-A1024',
        fecha_asignacion: '2026-06-29T14:30:00Z',
        nivel_prioridad: 'Urgente',
        estado: 'Ingresado',
        activo: {
          categoria: 'Electrónica',
          descripcion: 'PlayStation 5 Slim - Color Blanco',
          falla_declarada: 'Prende la luz azul un segundo y se apaga sola.',
        },
      },
    ]);
  }),

  http.post('*/api/v1/ordenes/:idOt/diagnostico', () => {
    return HttpResponse.json({
      status: 'success',
      mensaje: 'Diagnóstico y consumo de repuestos registrados correctamente.',
    });
  }),

  http.post('*/api/v1/ordenes/:idOt/evidencia', () => {
    return HttpResponse.json(
      {
        status: 'success',
        mensaje: 'Fotografía de respaldo adjuntada correctamente.',
        data: {
          id_evidencia: 5501,
          url_archivo: 'https://storage.worktrack.com/evidencias/ot-1024-ingreso.jpg',
        },
      },
      { status: 201 }
    );
  }),

  // ---------- MÓDULO 3: PORTAL DEL CLIENTE ----------
  http.get('*/api/v1/public/ordenes/:codigo', ({ params }) => {
    return HttpResponse.json({
      codigo_seguimiento: params.codigo,
      estado_actual: 'Presupuestado',
      activo: {
        descripcion: 'PlayStation 5 Slim - Color Blanco',
      },
      presupuesto: {
        monto_total: 85000.0,
        moneda: 'ARS',
        detalle_conceptos: 'Reemplazo de chip IC regulador de fuente.',
        fecha_validez_limite: '2026-07-05T23:59:59Z',
      },
    });
  }),

  http.put('*/api/v1/public/ordenes/:codigo/resolucion', () => {
    return HttpResponse.json({
      status: 'success',
      mensaje: 'Presupuesto procesado correctamente. El taller ha sido notificado.',
    });
  }),

  // ---------- MÓDULO 4: INVENTARIO ----------
  http.get('*/api/v1/repuestos', () => {
    return HttpResponse.json([
      {
        id_repuesto: 88,
        codigo: 'REP-ELEC-442',
        descripcion: 'Chip regulador de voltaje IC',
        stock_actual: 14,
        ubicacion_fisica: 'Estantería A - Caja 3',
      },
      {
        id_repuesto: 89,
        codigo: 'REP-MECA-012',
        descripcion: 'Filtro de aceite genérico tipo A',
        stock_actual: 5,
        ubicacion_fisica: 'Pasillo 2 - Estante Superior',
      },
    ]);
  }),

  http.post('*/api/v1/repuestos', () => {
    return HttpResponse.json(
      {
        status: 'success',
        mensaje: 'Repuesto registrado con éxito en el inventario.',
        id_repuesto_creado: 90,
      },
      { status: 201 }
    );
  }),
];