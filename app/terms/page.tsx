import Link from 'next/link';

export const metadata = {
  title: 'Términos y Condiciones | Loros FC',
  description: 'Términos y condiciones de uso del sitio oficial de Loros Fútbol Club.',
};

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-32">
      <div className="container mx-auto max-w-4xl px-4">
        <article className="rounded-2xl bg-white p-6 shadow-lg md:p-10">
          <header className="mb-10 border-b border-gray-200 pb-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-emerald-600">Loros F.C.</p>
            <h1 className="text-4xl font-black uppercase tracking-tight text-emerald-950 md:text-5xl">
              Términos y Condiciones
            </h1>
            <p className="mt-4 text-sm text-gray-500">Última actualización: 11 de agosto de 2026</p>
          </header>

          <div className="space-y-9 text-base leading-7 text-gray-700">
            <section>
              <h2 className="mb-3 text-2xl font-black text-emerald-900">1. Aceptación</h2>
              <p>
                Al acceder y utilizar este sitio web, aceptas estos Términos y Condiciones. Si no estás de acuerdo con
                alguno de ellos, te pedimos no utilizar el sitio. Loros F.C. podrá actualizar estos términos cuando sea
                necesario y publicará la versión vigente en esta misma página.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-emerald-900">2. Uso del sitio</h2>
              <p>
                El sitio tiene como finalidad compartir información sobre Loros F.C., incluyendo noticias, partidos,
                plantilla, patrocinadores, productos, materiales de comunicación y canales oficiales del club.
              </p>
              <p className="mt-3">Al utilizarlo te comprometes a:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Utilizar el sitio de forma lícita y respetuosa.</li>
                <li>No intentar acceder sin autorización a áreas administrativas o sistemas del club.</li>
                <li>No copiar, alterar, distribuir o utilizar el contenido con fines que perjudiquen al club o a terceros.</li>
                <li>No introducir código malicioso, automatizaciones abusivas o acciones que afecten la disponibilidad del sitio.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-emerald-900">3. Contenido y propiedad intelectual</h2>
              <p>
                Los nombres, escudos, logotipos, fotografías, diseños, textos, videos, materiales del Media Kit y demás
                elementos publicados pertenecen a Loros F.C. o se utilizan con autorización de sus titulares. Su uso,
                reproducción o distribución requiere autorización previa, salvo los usos permitidos por la legislación
                aplicable.
              </p>
              <p className="mt-3">
                Las fotografías y datos de jugadores, directiva, patrocinadores y colaboradores se publican para fines
                informativos y de comunicación institucional del club.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-emerald-900">4. Noticias, partidos y disponibilidad</h2>
              <p>
                La información deportiva, fechas, horarios, resultados, plantillas y noticias puede cambiar sin previo
                aviso. Loros F.C. procurará mantenerla actualizada, pero no garantiza que todo el contenido esté libre de
                errores o que los eventos se realicen exactamente como fueron publicados.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-emerald-900">5. Productos y enlaces externos</h2>
              <p>
                La sección de tienda puede mostrar productos y dirigir a páginas externas para consultar o realizar una
                compra. Cuando un enlace te lleve a otro sitio, los precios, disponibilidad, pagos, envíos, cambios,
                devoluciones, garantías y atención al cliente serán responsabilidad del proveedor externo correspondiente.
              </p>
              <p className="mt-3">
                Antes de completar una compra, revisa los términos, costos y políticas del sitio externo. Loros F.C. no
                solicita datos bancarios mediante mensajes directos en redes sociales.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-emerald-900">6. Patrocinios y contacto</h2>
              <p>
                Las solicitudes de patrocinio, colaboraciones o contacto enviadas por correo o redes sociales no crean
                por sí mismas una relación contractual. Cualquier acuerdo deberá formalizarse por escrito entre las
                partes correspondientes.
              </p>
              <p className="mt-3">
                Canal oficial: <a href="mailto:lorosfcqro@gmail.com" className="font-bold text-emerald-700 underline decoration-yellow-400 decoration-2 underline-offset-4">lorosfcqro@gmail.com</a>.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-emerald-900">7. Disponibilidad y enlaces</h2>
              <p>
                El sitio puede suspenderse temporalmente por mantenimiento, actualizaciones, fallas técnicas o causas
                fuera del control razonable del club. Los enlaces a redes sociales, patrocinadores y otros proveedores
                se ofrecen como referencia; cada tercero establece sus propias condiciones de uso y privacidad.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-emerald-900">8. Privacidad</h2>
              <p>
                El tratamiento de datos personales se describe en nuestro{' '}
                <Link href="/privacy" className="font-bold text-emerald-700 underline decoration-yellow-400 decoration-2 underline-offset-4">
                  Aviso de Privacidad
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-emerald-900">9. Legislación aplicable</h2>
              <p>
                Estos términos se interpretarán conforme a las leyes aplicables en México. Cualquier controversia se
                procurará resolver primero mediante comunicación directa con Loros F.C., sin perjuicio de los derechos
                que correspondan a las personas usuarias conforme a la legislación aplicable.
              </p>
            </section>
          </div>

          <div className="mt-8">
            <Link href="/" className="font-bold text-emerald-700 hover:text-emerald-900">
              ← Volver al inicio
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default TermsPage;
