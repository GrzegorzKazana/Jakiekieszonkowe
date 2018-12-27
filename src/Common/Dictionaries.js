export const getProvinces = () => [
  { id: 0, name: "Śląskie" },
  { id: 1, name: "Mazowieckie" },
  { id: 2, name: "Małopolskie" }
];

export const getCities = provinceIdx => {
  switch (provinceIdx) {
    case 0:
      return [
        { id: 0, name: "Gliwice" },
        { id: 1, name: "Katowice" },
        { id: 2, name: "Zabrze" }
      ];
    case 1:
      return [
        { id: 3, name: "Warszawa" },
        { id: 4, name: "Radom" },
        { id: 5, name: "England xd" }
      ];
    case 2:
      return [
        { id: 6, name: "Kraków" },
        { id: 7, name: "Tarnów" },
        { id: 8, name: "Nowy Sącz" }
      ];
  }
};
