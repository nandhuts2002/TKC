export interface GalleryItem {
  src: string
  title: string
  caption: string
  group: 'Machinery' | 'Plantation'
}

// Single source of truth for the machine photos (Processing section + Gallery).
export const machines = [
  { src: '/images/machines/cardamom-washing-machine.jpg', title: 'Cardamom Washing Machine', caption: 'Freshly harvested pods are washed here to remove soil, mud and field impurities.' },
  { src: '/images/machines/polishing-machine.jpg', title: 'Polishing Machine', caption: 'Removes flower remnants and dry residues attached to the dried pods.' },
  { src: '/images/machines/grading-machine.jpg', title: 'Grading Machine', caption: 'Separates the polished cardamom into size grades.' },
  { src: '/images/machines/cardamom-store.jpg', title: 'Cardamom Store', caption: 'The in-house store where cardamom is held within the plantation.' }
]

export function useGallery(): GalleryItem[] {
  return [
    ...machines.map((m) => ({ ...m, group: 'Machinery' as const })),
    { src: '/images/hero_plantation.webp', title: 'The Plantation', caption: 'Vandiperiyar, Idukki, at about 3,400 ft.', group: 'Plantation' },
    { src: '/images/crop_cardamom.webp', title: 'Cardamom', caption: 'Grown under shade near the Periyar Tiger Reserve.', group: 'Plantation' },
    { src: '/images/crop_black_pepper.webp', title: 'Black Pepper', caption: 'Pepper vines on the estate.', group: 'Plantation' },
    { src: '/images/crop_coffee.webp', title: 'Coffee', caption: 'Coffee grown alongside our spices.', group: 'Plantation' }
  ]
}
