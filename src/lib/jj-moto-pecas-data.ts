export interface UnidadeData {
  slug: string;
  nome: string;
  unidade: string;
  telefone: string;
  whatsapp: string;
  mensagemWhatsapp: string;
  endereco: string;
  linkMaps: string;
  embedMaps: string;
  horarioSemana: string;
  horarioSabado: string;
  email: string;
  instagram: string;
  facebook: string;
  youtube: string;
}

export const UNIDADES: Record<string, UnidadeData> = {
  parauapebas: {
    slug: "parauapebas",
    nome: "JJ Moto Peças Parauapebas",
    unidade: "Parauapebas - PA",
    telefone: "(94) 3346-1234",
    whatsapp: "5594991234567",
    mensagemWhatsapp: "Olá! Gostaria de fazer um orçamento de peças/acessórios na unidade de Parauapebas.",
    endereco: "Av. PA-275, Qd. 82, Lote 14 - Cidade Nova, Parauapebas - PA, 68515-000",
    linkMaps: "https://maps.app.goo.gl/dNg8c9XmYyRz9G5a7",
    embedMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15876.126442657805!2d-49.907993!3d-6.067341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92c6109e25d2b7b5%3A0xe54e605d8f6154b0!2sParauapebas%20-%20State%20of%20Par%C3%A1!5e0!3m2!1sen!2sbr!4v1716382000000!5m2!1sen!2sbr",
    horarioSemana: "08:00 às 18:00",
    horarioSabado: "08:00 às 13:00",
    email: "parauapebas@jjmotopecas.com.br",
    instagram: "https://www.instagram.com/jjmotopecas_",
    facebook: "https://www.facebook.com/jjmotopecas",
    youtube: "https://www.youtube.com/@jjmotopecas"
  },
  maraba: {
    slug: "maraba",
    nome: "JJ Moto Peças Marabá",
    unidade: "Marabá - PA",
    telefone: "(94) 3322-5678",
    whatsapp: "5594992345678",
    mensagemWhatsapp: "Olá! Gostaria de fazer um orçamento de peças/acessórios na unidade de Marabá.",
    endereco: "Rodovia Transamazônica, Km 02, Qd. 10 - Nova Marabá, Marabá - PA, 68509-000",
    linkMaps: "https://maps.app.goo.gl/9yYzRz9G5a7DNg8c9",
    embedMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15881.189524021295!2d-49.124567!3d-5.367891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92c423ac2e75e119%3A0x6d1234acfe567b3f!2sMarab%C3%A1%20-%20State%20of%20Par%C3%A1!5e0!3m2!1sen!2sbr!4v1716382100000!5m2!1sen!2sbr",
    horarioSemana: "08:00 às 18:00",
    horarioSabado: "08:00 às 13:00",
    email: "maraba@jjmotopecas.com.br",
    instagram: "https://www.instagram.com/jjmotopecas_",
    facebook: "https://www.facebook.com/jjmotopecas",
    youtube: "https://www.youtube.com/@jjmotopecas"
  },
  canaa: {
    slug: "canaa",
    nome: "JJ Moto Peças Canaã",
    unidade: "Canaã dos Carajás - PA",
    telefone: "(94) 3358-9012",
    whatsapp: "5594993456789",
    mensagemWhatsapp: "Olá! Gostaria de fazer um orçamento de peças/acessórios na unidade de Canaã dos Carajás.",
    endereco: "Av. Weyne Cavalcante, 1250 - Centro, Canaã dos Carajás - PA, 68537-000",
    linkMaps: "https://maps.app.goo.gl/cRz9G5a7dNg8c9XmY",
    embedMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15892.428945209733!2d-50.045612!3d-6.495612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92c681cfc67a57a5%3A0x7d6f5c81db543cf9!2sCana%C3%A3%20dos%20Caraj%C3%A1s%20-%20State%20of%20Par%C3%A1!5e0!3m2!1sen!2sbr!4v1716382200000!5m2!1sen!2sbr",
    horarioSemana: "08:00 às 18:00",
    horarioSabado: "08:00 às 13:00",
    email: "canaa@jjmotopecas.com.br",
    instagram: "https://www.instagram.com/jjmotopecas_",
    facebook: "https://www.facebook.com/jjmotopecas",
    youtube: "https://www.youtube.com/@jjmotopecas"
  }
};
