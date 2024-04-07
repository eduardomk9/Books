import dayjs from "dayjs";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const useFormatString = () => {
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string, width?: number, height?: number) {
    return {
      style: { ...(width && height && { fontSize: width / 2 }) },
      sx: {
        bgcolor: stringToColor(name),
        ...(width && height && { width: width, height: height }),
      },
      children: name ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}` : "",
    };
  }

  function capitalizeFirstLetter(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function formatName(name: string) {
    let splitName = name.split(".");
    if (splitName.length === 2) {
      return `${capitalizeFirstLetter(
        splitName[0].replace("t_", "")
      )} ${capitalizeFirstLetter(splitName[1])}`;
    }
    return name;
  }

  function formatPhone(phone: string) {
    if (!phone) {
      return "";
    }

    // Tenta detectar o país com base no número e se falhar, usa 'BR'.
    const phoneNumber =
      parsePhoneNumberFromString(phone) ||
      parsePhoneNumberFromString(phone, "BR");

    if (!phoneNumber) {
      return "";
    }

    return phoneNumber.formatInternational();
  }
  function formatDateTime(dateTime?: Date) {
    return dateTime ? dayjs(dateTime).format("DD/MM/YYYY HH:mm") : dateTime;
  }
  function formatDate(date?: Date) {
    return date ? dayjs(date).format("DD/MM/YYYY") : date;
  }

  function stripHtmlTags(htmlString: string): string {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    return tempElement.textContent || tempElement.innerText || "";
  }

  function extractKeywords(text: string): string[] {
    // Remove caracteres especiais e de pontuação
    const cleanedText = text.replace(/[^\w\s]/g, "");

    // Divide o texto em palavras separadas por espaço
    const words = cleanedText.split(/\s+/);

    // Filtre apenas as palavras que não são muito comuns (exemplo: tamanho maior que 3)
    const filteredWords = words.filter((word) => word.length > 3);

    // Crie um objeto Set para garantir que cada palavra seja única
    const uniqueWords = new Set(filteredWords);

    // Converta de volta para um array e retorne as palavras-chave
    return Array.from(uniqueWords);
  }
  return {
    stringToColor,
    stringAvatar,
    formatName,
    formatPhone,
    capitalizeFirstLetter,
    formatDateTime,
    formatDate,
    stripHtmlTags,
    extractKeywords,
  };
};
