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
  telefonesExtras?: { label?: string; numero: string }[];
}

export const UNIDADES: Record<string, UnidadeData> = {
  parauapebas: {
    slug: "parauapebas",
    nome: "JJ Moto Peças Parauapebas",
    unidade: "Parauapebas - PA",
    telefone: "(94) 93500-8113",
    whatsapp: "5594935008113",
    mensagemWhatsapp: "Olá! Gostaria de fazer um orçamento de peças/acessórios na unidade de Parauapebas.",
    endereco: "Av. PA-275, Qd. 82, Lote 14 - Cidade Nova, Parauapebas - PA, 68515-000",
    linkMaps: "https://www.google.com/maps/search/?api=1&query=JJ+Moto+Pe%C3%A7as+Parauapebas",
    embedMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15876.126442657805!2d-49.907993!3d-6.067341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92c6109e25d2b7b5%3A0xe54e605d8f6154b0!2sParauapebas%20-%20State%20of%20Par%C3%A1!5e0!3m2!1sen!2sbr!4v1716382000000!5m2!1sen!2sbr",
    horarioSemana: "08:00 às 18:00",
    horarioSabado: "08:00 às 13:00",
    email: "parauapebas@jjmotopecas.com.br",
    instagram: "https://www.instagram.com/jjmotopecasparauapebas/",
    facebook: "https://www.facebook.com/jjmotopecas",
    youtube: "https://www.youtube.com/@jjmotopecas",
    telefonesExtras: [
      { label: "Cidade Jardim", numero: "(94) 93500-8113" },
      { label: "Rio Verde", numero: "(94) 99285-6543" }
    ]
  },
  maraba: {
    slug: "maraba",
    nome: "JJ Moto Peças Marabá",
    unidade: "Marabá - PA",
    telefone: "(94) 99123-0888",
    whatsapp: "5594991230888",
    mensagemWhatsapp: "Olá! Gostaria de fazer um orçamento de peças/acessórios na unidade de Marabá.",
    endereco: "Rodovia Transamazônica, Km 02, Qd. 10 - Nova Marabá, Marabá - PA, 68509-000",
    linkMaps: "https://www.google.com/maps/search/?api=1&query=JJ+Moto+Pe%C3%A7as+Maraba",
    embedMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15881.189524021295!2d-49.124567!3d-5.367891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92c423ac2e75e119%3A0x6d1234acfe567b3f!2sMarab%C3%A1%20-%20State%20of%20Par%C3%A1!5e0!3m2!1sen!2sbr!4v1716382100000!5m2!1sen!2sbr",
    horarioSemana: "08:00 às 18:00",
    horarioSabado: "08:00 às 13:00",
    email: "maraba@jjmotopecas.com.br",
    instagram: "http://instagram.com/jjmotopecasmaraba/",
    facebook: "https://www.facebook.com/jjmotopecas",
    youtube: "https://www.youtube.com/@jjmotopecas",
    telefonesExtras: [
      { label: "Matriz", numero: "(94) 99123-0888" },
      { label: "Cidade Nova", numero: "(94) 99292-0888" },
      { label: "São Félix", numero: "(94) 98421-5742" }
    ]
  },
  ananindeua: {
    slug: "ananindeua",
    nome: "JJ Moto Peças Ananindeua",
    unidade: "Ananindeua - PA",
    telefone: "(91) 98032-2772",
    whatsapp: "5591980322772",
    mensagemWhatsapp: "Olá! Gostaria de fazer um orçamento de peças/acessórios na unidade de Ananindeua.",
    endereco: "Rodovia BR-316, Km 08 - Centro, Ananindeua - PA, 67030-000",
    linkMaps: "https://www.google.com/maps/search/?api=1&query=JJ+Moto+Pe%C3%A7as+Ananindeua",
    embedMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31899.98826553856!2d-48.403456!3d-1.365432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92c60c1d1d86d7cb%3A0xbd1e54911d51a614!2sAnanindeua%20-%20State%20of%20Par%C3%A1!5e0!3m2!1sen!2sbr!4v1716382200000!5m2!1sen!2sbr",
    horarioSemana: "08:00 às 18:00",
    horarioSabado: "08:00 às 13:00",
    email: "ananindeua@jjmotopecas.com.br",
    instagram: "https://www.instagram.com/jjmotopecasananindeua/",
    facebook: "https://www.facebook.com/jjmotopecas",
    youtube: "https://www.youtube.com/@jjmotopecas",
    telefonesExtras: [
      { numero: "(91) 98032-2772" },
      { numero: "(91) 98431-5468" }
    ]
  }
};
