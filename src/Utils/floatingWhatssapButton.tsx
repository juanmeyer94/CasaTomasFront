export function FloatingWhatsAppButton() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=5491155555555&text=Hola%20Casa%20Tomas,%20tengo%20una%20consulta."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition-colors"
    >
      <img src="/whatsapp.png" alt="WhatsApp" className="h-10 w-10" />
    </a>
  );
}