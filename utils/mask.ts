/*---- =======================
INPUT START ----------------*/
// FUNÇÃO PARA FORMATAR MOEDA (R$ 0,00)
export function maskMoney(value: string) {
    const onlyNumbers = value.replace(/\D/g, "");
    const numberValue = Number(onlyNumbers) / 100;

    return numberValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
};

// FUNÇÃO PARA FORMATAR PORCENTAGEM (00,00%)
export function maskPercent(value: string) {
    const onlyNumbers = value.replace(/\D/g, "");
    const numberValue = Number(onlyNumbers) / 100;

    return `${numberValue.toFixed(2).replace(".", ",")}%`;
};

export function maskCpf(value: string) {
    return value
        .replace(/\D/g, "")
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

// FUNÇÃO PARA FORMATAR CNPJ (00.000.000/0000-00)
export function maskCNPJ(value: string) {
    return value
        .replace(/\D/g, "")
        .slice(0, 14)
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
};

// FUNÇÃO PARA FORMATAR CEP (00000-000)
export function maskCEP(value: string) {
    return value
        .replace(/\D/g, "")
        .slice(0, 8)
        .replace(/^(\d{5})(\d)/, "$1-$2");
};
/*---- =======================
INPUT END ------------------*/

/*---- =======================
EXIBIÇÃO START -------------*/
// FUNÇÃO PARA FORMATAR EM MOEDA (R$ 0,00)
export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(value);
};

// FUNÇÃO PARA FORMATAR DATA (DD/MM/YYYY)
export const formatDateToBR = (dateTimeString: string) => {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    
    // EXTRAINDO OS COMPONENTES CORRETAMENTE
    const day   = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year  = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
};

// FUNÇÃO PARA FORMATAR DATA E HORA (DD/MM/YYYY HH:MM)
export const formatDateTimeToBR = (dateTimeString: string) => {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    
    // EXTRAINDO OS COMPONENTES CORRETAMENTE
    const day     = date.getUTCDate().toString().padStart(2, "0");
    const month   = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year    = date.getUTCFullYear();
    const hours   = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

// FUNÇÃO PARA FORMATAR O CPF (000.000.000-00)
export const formatCPF = (document: string) => {
    return document.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};

// FUNÇÃO PARA FORMATAR O CNPJ (00.000.000/0000-00)
export const formatCNPJ = (document: string) => {
    return document.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
};
/*---- =======================
EXIBIÇÃO END ---------------*/