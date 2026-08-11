import Link from 'next/link';
import React from "react";

export const metadata = {
  title: 'Aviso de Privacidad | Loros FC',
  description: 'Aviso de privacidad integral de Loros Fútbol Club.',
};

const PrivacyPage = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-emerald-950 py-16 text-white md:py-20">
        <div className="absolute inset-0 bg-[url('/assets/textures/carbon-fibre.svg')] opacity-20" aria-hidden="true" />
      </section>
      <div className="min-h-screen bg-gray-50 pb-20 pt-32">
      <div className="container mx-auto max-w-4xl px-4">
        <article className="rounded-2xl bg-white p-6 shadow-lg md:p-10">
          <header className="mb-10 border-b border-gray-200 pb-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-emerald-600">Loros F.C.</p>
            <h1 className="text-4xl font-black uppercase tracking-tight text-emerald-950 md:text-5xl">
              Aviso de Privacidad
            </h1>
            <p className="mt-4 text-sm text-gray-500">Última actualización: 11 de agosto de 2026</p>
          </header>

          <div className="space-y-9 text-base leading-7 text-gray-700">
            <section>
              <h2 className="mb-3 text-2xl font-black text-emerald-900">1. Responsable</h2>
              <p>
                Loros Fútbol Club, con domicilio en Querétaro, Querétaro, México, es responsable del tratamiento y
                protección de los datos personales que, en su caso, sean recabados a través de este sitio web y de sus
                canales oficiales.
              </p>
              <p className="mt-3">
                Para dudas o solicitudes relacionadas con privacidad, puedes contactar al club mediante el correo
                oficial{' '}
                <a
                  href="mailto:lorosfcqro@gmail.com"
                  className="font-bold text-emerald-700 underline decoration-yellow-400 decoration-2 underline-offset-4"
                >
                  lorosfcqro@gmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-emerald-900">2. Datos personales que podemos tratar</h2>
              <p>
                Este sitio está diseñado principalmente para publicar información deportiva, noticias, calendario,
                plantilla, patrocinadores y productos del club. No es necesario proporcionar datos personales para
                consultar la mayoría de sus páginas.
              </p>
              <p className="mt-3">Dependiendo de la interacción que realices, podrían tratarse:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Datos de contacto que decidas compartir por redes sociales o canales oficiales.</li>
                <li>Correo electrónico y datos de autenticación de las personas autorizadas para el panel administrativo.</li>
                <li>Datos técnicos necesarios para mantener la seguridad y funcionamiento del sitio.</li>
              </ul>
              <p className="mt-3">
                El club no solicita intencionalmente datos personales sensibles a través de este sitio.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-emerald-900">3. Finalidades del tratamiento</h2>
              <p>Los datos personales podrán utilizarse para las siguientes finalidades primarias:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Gestionar y proteger el acceso autorizado al panel administrativo.</li>
                <li>Atender solicitudes, dudas, propuestas de patrocinio o mensajes de contacto.</li>
                <li>Dar seguimiento a solicitudes relacionadas con derechos de privacidad.</li>
                <li>Mantener la seguridad, disponibilidad y funcionamiento técnico del sitio.</li>
              </ul>
              <p className="mt-3">
                Si en el futuro se habilitan formularios de newsletter, promociones, boletos o comercio electrónico,
                se informará el tratamiento aplicable antes de recabar los datos correspondientes.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-emerald-900">4. Servicios de terceros</h2>
              <p>
                El sitio utiliza servicios tecnológicos de terceros para autenticación, almacenamiento y operación de
                contenidos, incluyendo Firebase de Google. Además, algunos enlaces pueden dirigir a las páginas
                oficiales de redes sociales, patrocinadores o proveedores externos.
              </p>
              <p className="mt-3">
                Cuando abandones este sitio, el tratamiento de tus datos quedará sujeto al aviso de privacidad y las
                políticas de la plataforma externa correspondiente. No compartas contraseñas, datos bancarios ni
                información sensible por mensajes directos en redes sociales.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-emerald-900">5. Cookies y tecnologías similares</h2>
              <p>
                El sitio puede utilizar almacenamiento técnico y tecnologías similares para mantener sesiones de acceso
                administrativo, proteger la plataforma y recordar información necesaria para su funcionamiento. No se
                implementan intencionalmente cookies de publicidad conductual en esta versión del sitio.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-emerald-900">6. Seguridad y conservación</h2>
              <p>
                Loros F.C. procurará aplicar medidas administrativas, técnicas y físicas razonables para proteger los
                datos personales contra daño, pérdida, alteración, destrucción, acceso o tratamiento no autorizado.
                Los datos se conservarán únicamente durante el tiempo necesario para cumplir las finalidades
                informadas o las obligaciones legales aplicables.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-emerald-900">7. Derechos ARCO</h2>
              <p>
                Puedes ejercer tus derechos de acceso, rectificación, cancelación u oposición respecto de tus datos
                personales. La solicitud deberá incluir tu nombre, un medio para recibir respuesta, identificación,
                descripción clara de los datos y el derecho que deseas ejercer.
              </p>
              <p className="mt-3">
                Para iniciar una solicitud, escribe a{' '}
                <a
                  href="mailto:lorosfcqro@gmail.com?subject=Solicitud%20de%20privacidad%20Loros%20FC"
                  className="font-bold text-emerald-700 underline decoration-yellow-400 decoration-2 underline-offset-4"
                >
                  lorosfcqro@gmail.com
                </a>{' '}
                con el asunto “Solicitud de privacidad Loros FC”. El club podrá solicitar información adicional para
                verificar tu identidad antes de responder.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black text-emerald-900">8. Cambios al aviso</h2>
              <p>
                Cualquier modificación a este aviso será publicada en esta misma página. La fecha de actualización que
                aparece al inicio permitirá identificar la versión vigente.
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
    </>
  );
};

export default PrivacyPage;
