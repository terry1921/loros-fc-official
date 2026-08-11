import Link from 'next/link';
import {Facebook, Instagram, Mail, MessageCircle} from 'lucide-react';

export const metadata = {
  title: 'Contacto | Loros FC',
  description: 'Canales oficiales de contacto de Loros Fútbol Club.',
};

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-32">
      <div className="container mx-auto max-w-5xl px-4">
        <header className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-emerald-600">Loros F.C.</p>
          <h1 className="text-4xl font-black uppercase tracking-tight text-emerald-950 md:text-5xl">Contacto</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            ¿Quieres colaborar, proponer un patrocinio o comunicarte con el club? Estos son nuestros canales oficiales.
          </p>
          <div className="mx-auto mt-6 h-1.5 w-24 rounded bg-yellow-400" />
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          <a
            href="mailto:lorosfcqro@gmail.com"
            className="group rounded-2xl bg-emerald-950 p-7 text-white shadow-lg transition-transform hover:-translate-y-1"
          >
            <Mail className="mb-6 text-yellow-400" size={34} />
            <h2 className="text-xl font-black">Correo oficial</h2>
            <p className="mt-3 break-all text-emerald-100">lorosfcqro@gmail.com</p>
            <span className="mt-6 inline-block font-bold text-yellow-400 group-hover:text-yellow-300">Enviar correo →</span>
          </a>

          <a
            href="https://www.instagram.com/lorosfcqro/"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl bg-white p-7 shadow-lg transition-transform hover:-translate-y-1"
          >
            <Instagram className="mb-6 text-emerald-700" size={34} />
            <h2 className="text-xl font-black text-emerald-950">Instagram</h2>
            <p className="mt-3 text-gray-600">@lorosfcqro</p>
            <span className="mt-6 inline-block font-bold text-emerald-700 group-hover:text-emerald-900">Abrir Instagram →</span>
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61583836440400"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl bg-white p-7 shadow-lg transition-transform hover:-translate-y-1"
          >
            <Facebook className="mb-6 text-emerald-700" size={34} />
            <h2 className="text-xl font-black text-emerald-950">Facebook</h2>
            <p className="mt-3 text-gray-600">Página oficial de Loros F.C.</p>
            <span className="mt-6 inline-block font-bold text-emerald-700 group-hover:text-emerald-900">Abrir Facebook →</span>
          </a>
        </div>

        <section className="mt-10 rounded-2xl bg-white p-7 shadow-lg md:p-10">
          <div className="flex items-start gap-4">
            <MessageCircle className="mt-1 shrink-0 text-yellow-500" size={28} />
            <div>
              <h2 className="text-2xl font-black text-emerald-950">¿Qué necesitas?</h2>
              <p className="mt-3 leading-7 text-gray-600">
                Para patrocinio, colaboraciones, medios de comunicación, productos o información general, escribe a
                nuestro correo oficial. Para solicitudes relacionadas con tus datos personales, consulta el{' '}
                <Link href="/privacy" className="font-bold text-emerald-700 underline decoration-yellow-400 decoration-2 underline-offset-4">
                  Aviso de Privacidad
                </Link>
                .
              </p>
              <a
                href="mailto:lorosfcqro@gmail.com?subject=Contacto%20Loros%20FC"
                className="mt-6 inline-flex rounded-lg bg-yellow-400 px-5 py-3 font-bold text-emerald-950 transition-colors hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
              >
                Escribir a Loros F.C.
              </a>
            </div>
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link href="/" className="font-bold text-emerald-700 hover:text-emerald-900">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
