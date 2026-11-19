// Offline fallback copy of the catalogue. The live source of truth is the MySQL database (backend/src/main/resources/data.sql).
// Used only when the Spring Boot API cannot be reached.
const products = [
  {
    "id": 1,
    "code": "ES-001",
    "name": "Poonam Sarees",
    "shortDescription": "Pack of 2 festive Poonam sarees in magenta and teal with contrast borders.",
    "fullDescription": "A festive pack of 2 Poonam sarees in rich magenta and teal blue, finished with contrasting woven-style borders and floral motifs. Ideal for pujas, family functions and Diwali gifting.",
    "category": {
      "id": 1,
      "name": "Sarees",
      "slug": "sarees"
    },
    "audience": "WOMEN",
    "price": 399,
    "originalPrice": null,
    "discountPercent": null,
    "packInfo": "2 pc",
    "sizes": [],
    "colours": [
      "Magenta",
      "Teal Blue"
    ],
    "imagePath": "https://res.cloudinary.com/ibdswcti/image/upload/v1795094555/poonam-sarees.jpg",
    "inStock": true,
    "featured": true,
    "newArrival": false,
    "confirmationNote": "Price, pack size and photo are from the shop flyer. Fabric, available sizes and stock are not on the flyer - please confirm.",
    "createdAt": "2026-11-01T10:01:00"
  },
  {
    "id": 2,
    "code": "ES-002",
    "name": "Inskirt",
    "shortDescription": "Pack of 2 comfortable inskirts in navy blue and red.",
    "fullDescription": "A value pack of 2 inskirts in navy blue and red dotted prints, made to sit comfortably under sarees. Everyday essentials at an easy price.",
    "category": {
      "id": 4,
      "name": "Bottom Wear",
      "slug": "bottom-wear"
    },
    "audience": "WOMEN",
    "price": 180,
    "originalPrice": null,
    "discountPercent": null,
    "packInfo": "2 pc",
    "sizes": [],
    "colours": [
      "Navy Blue",
      "Red"
    ],
    "imagePath": "https://res.cloudinary.com/ibdswcti/image/upload/v1795094554/inskirt.jpg",
    "inStock": true,
    "featured": false,
    "newArrival": true,
    "confirmationNote": "Price, pack size and photo are from the shop flyer. Fabric, available sizes and stock are not on the flyer - please confirm.",
    "createdAt": "2026-11-01T10:02:00"
  },
  {
    "id": 3,
    "code": "ES-003",
    "name": "Kalamkari Blouse",
    "shortDescription": "Pack of 2 Kalamkari-style printed blouses in bold red-orange and blue.",
    "fullDescription": "A pack of 2 ready blouses with bold Kalamkari-style prints in red-orange and deep blue. Pairs well with plain and contrast sarees.",
    "category": {
      "id": 2,
      "name": "Blouses",
      "slug": "blouses"
    },
    "audience": "WOMEN",
    "price": 150,
    "originalPrice": null,
    "discountPercent": null,
    "packInfo": "2 pc",
    "sizes": [],
    "colours": [
      "Red-Orange Print",
      "Blue Print"
    ],
    "imagePath": "https://res.cloudinary.com/ibdswcti/image/upload/v1795094554/kalamkari-blouse.jpg",
    "inStock": true,
    "featured": true,
    "newArrival": false,
    "confirmationNote": "Price, pack size and photo are from the shop flyer. Fabric, available sizes and stock are not on the flyer - please confirm.",
    "createdAt": "2026-11-01T10:03:00"
  },
  {
    "id": 4,
    "code": "ES-004",
    "name": "Silk Cotton Blouse",
    "shortDescription": "Pack of 2 silk cotton blouses in green and pink with gold-tone sleeve borders.",
    "fullDescription": "A pack of 2 silk cotton blouses in bottle green and bright pink with gold-tone sleeve borders. A budget-friendly pair to match your silk sarees.",
    "category": {
      "id": 2,
      "name": "Blouses",
      "slug": "blouses"
    },
    "audience": "WOMEN",
    "price": 99,
    "originalPrice": null,
    "discountPercent": null,
    "packInfo": "2 pc",
    "sizes": [],
    "colours": [
      "Green",
      "Pink"
    ],
    "imagePath": "https://res.cloudinary.com/ibdswcti/image/upload/v1795094556/silk-cotton-blouse.jpg",
    "inStock": true,
    "featured": true,
    "newArrival": false,
    "confirmationNote": "Price, pack size and photo are from the shop flyer. Fabric, available sizes and stock are not on the flyer - please confirm.",
    "createdAt": "2026-11-01T10:04:00"
  },
  {
    "id": 5,
    "code": "ES-005",
    "name": "Tops",
    "shortDescription": "Pack of 2 printed tops in coral red and blue.",
    "fullDescription": "A pack of 2 printed tops in coral red and blue with a relaxed fit and V-neckline. Easy to wear for work, college and everyday outings.",
    "category": {
      "id": 3,
      "name": "Tops",
      "slug": "tops"
    },
    "audience": "WOMEN",
    "price": 399,
    "originalPrice": null,
    "discountPercent": null,
    "packInfo": "2 pc",
    "sizes": [],
    "colours": [
      "Coral Red Print",
      "Blue Print"
    ],
    "imagePath": "https://res.cloudinary.com/ibdswcti/image/upload/v1795094556/tops.jpg",
    "inStock": true,
    "featured": true,
    "newArrival": true,
    "confirmationNote": "Price, pack size and photo are from the shop flyer. Fabric, available sizes and stock are not on the flyer - please confirm.",
    "createdAt": "2026-11-01T10:05:00"
  },
  {
    "id": 6,
    "code": "ES-006",
    "name": "Leggings",
    "shortDescription": "Pack of 2 stretch-fit leggings in navy blue and maroon.",
    "fullDescription": "A pack of 2 plain leggings in navy blue and maroon. A wardrobe staple to wear with kurtis and tops.",
    "category": {
      "id": 4,
      "name": "Bottom Wear",
      "slug": "bottom-wear"
    },
    "audience": "WOMEN",
    "price": 199,
    "originalPrice": null,
    "discountPercent": null,
    "packInfo": "2 pc",
    "sizes": [],
    "colours": [
      "Navy Blue",
      "Maroon"
    ],
    "imagePath": "https://res.cloudinary.com/ibdswcti/image/upload/v1795094555/leggings.jpg",
    "inStock": true,
    "featured": false,
    "newArrival": true,
    "confirmationNote": "Price, pack size and photo are from the shop flyer. Fabric, available sizes and stock are not on the flyer - please confirm.",
    "createdAt": "2026-11-01T10:06:00"
  },
  {
    "id": 7,
    "code": "ES-007",
    "name": "Popcorn Plazo",
    "shortDescription": "Pack of 2 textured plazos in olive green and purple.",
    "fullDescription": "A pack of 2 popcorn-textured plazos in olive green and purple with a flowy wide-leg fall. Light and comfortable for all-day wear.",
    "category": {
      "id": 4,
      "name": "Bottom Wear",
      "slug": "bottom-wear"
    },
    "audience": "WOMEN",
    "price": 199,
    "originalPrice": null,
    "discountPercent": null,
    "packInfo": "2 pc",
    "sizes": [],
    "colours": [
      "Olive Green",
      "Purple"
    ],
    "imagePath": "https://res.cloudinary.com/ibdswcti/image/upload/v1795094556/popcorn-plazo.jpg",
    "inStock": true,
    "featured": false,
    "newArrival": true,
    "confirmationNote": "Price, pack size and photo are from the shop flyer. Fabric, available sizes and stock are not on the flyer - please confirm.",
    "createdAt": "2026-11-01T10:07:00"
  },
  {
    "id": 8,
    "code": "ES-008",
    "name": "Nighties",
    "shortDescription": "Pack of 2 printed nighties in pink and black.",
    "fullDescription": "A pack of 2 short-sleeve printed nighties in bright pink and black. Soft, loose and made for comfortable nights at home.",
    "category": {
      "id": 5,
      "name": "Dresses",
      "slug": "dresses"
    },
    "audience": "WOMEN",
    "price": 299,
    "originalPrice": null,
    "discountPercent": null,
    "packInfo": "2 pc",
    "sizes": [],
    "colours": [
      "Pink",
      "Black Print"
    ],
    "imagePath": "https://res.cloudinary.com/ibdswcti/image/upload/v1795094555/nighties.jpg",
    "inStock": true,
    "featured": true,
    "newArrival": false,
    "confirmationNote": "Price, pack size and photo are from the shop flyer. Fabric, available sizes and stock are not on the flyer - please confirm.",
    "createdAt": "2026-11-01T10:08:00"
  },
  {
    "id": 9,
    "code": "ES-009",
    "name": "Roundneck T-shirts",
    "shortDescription": "Pack of 2 plain round-neck T-shirts in navy blue and olive green.",
    "fullDescription": "A pack of 2 plain round-neck half-sleeve T-shirts in navy blue and olive green. Simple everyday basics.",
    "category": {
      "id": 6,
      "name": "T-Shirts",
      "slug": "t-shirts"
    },
    "audience": "UNISEX",
    "price": 180,
    "originalPrice": null,
    "discountPercent": null,
    "packInfo": "2 pc",
    "sizes": [],
    "colours": [
      "Navy Blue",
      "Olive Green"
    ],
    "imagePath": "https://res.cloudinary.com/ibdswcti/image/upload/v1795094555/roundneck-tshirts.jpg",
    "inStock": true,
    "featured": false,
    "newArrival": true,
    "confirmationNote": "Price, pack size and photo are from the shop flyer. Fabric, available sizes and stock are not on the flyer - please confirm. Audience (Men/Women) is not stated on the flyer - please confirm.",
    "createdAt": "2026-11-01T10:09:00"
  },
  {
    "id": 10,
    "code": "ES-010",
    "name": "Shorts",
    "shortDescription": "Pack of 2 casual shorts in navy blue and grey.",
    "fullDescription": "A pack of 2 casual drawstring shorts in navy blue and grey. Comfortable for home, travel and sport.",
    "category": {
      "id": 4,
      "name": "Bottom Wear",
      "slug": "bottom-wear"
    },
    "audience": "UNISEX",
    "price": 180,
    "originalPrice": null,
    "discountPercent": null,
    "packInfo": "2 pc",
    "sizes": [],
    "colours": [
      "Navy Blue",
      "Grey"
    ],
    "imagePath": "https://res.cloudinary.com/ibdswcti/image/upload/v1795094555/shorts.jpg",
    "inStock": true,
    "featured": false,
    "newArrival": true,
    "confirmationNote": "Price, pack size and photo are from the shop flyer. Fabric, available sizes and stock are not on the flyer - please confirm. Audience (Men/Women) is not stated on the flyer - please confirm.",
    "createdAt": "2026-11-01T10:10:00"
  },
  {
    "id": 11,
    "code": "ES-011",
    "name": "Track Pant",
    "shortDescription": "Pack of 2 track pants in black and grey with side stripes.",
    "fullDescription": "A pack of 2 track pants in black and grey with contrast side stripes. Suited for workouts, walks and casual wear.",
    "category": {
      "id": 4,
      "name": "Bottom Wear",
      "slug": "bottom-wear"
    },
    "audience": "UNISEX",
    "price": 299,
    "originalPrice": null,
    "discountPercent": null,
    "packInfo": "2 pc",
    "sizes": [],
    "colours": [
      "Black",
      "Grey"
    ],
    "imagePath": "https://res.cloudinary.com/ibdswcti/image/upload/v1795094556/track-pant.jpg",
    "inStock": true,
    "featured": false,
    "newArrival": true,
    "confirmationNote": "Price, pack size and photo are from the shop flyer. Fabric, available sizes and stock are not on the flyer - please confirm. Audience (Men/Women) is not stated on the flyer - please confirm.",
    "createdAt": "2026-11-01T10:11:00"
  },
  {
    "id": 12,
    "code": "ES-012",
    "name": "Kids Shorts",
    "shortDescription": "Pack of 10 colourful kids shorts in assorted colours.",
    "fullDescription": "A big pack of 10 kids shorts in assorted bright colours. Great value for school holidays and play time.",
    "category": {
      "id": 7,
      "name": "Kids Wear",
      "slug": "kids-wear"
    },
    "audience": "KIDS",
    "price": 299,
    "originalPrice": null,
    "discountPercent": null,
    "packInfo": "10 pc",
    "sizes": [],
    "colours": [
      "Assorted Colours"
    ],
    "imagePath": "https://res.cloudinary.com/ibdswcti/image/upload/v1795094554/kids-shorts.jpg",
    "inStock": true,
    "featured": false,
    "newArrival": false,
    "confirmationNote": "Price, pack size and photo are from the shop flyer. Fabric, available sizes and stock are not on the flyer - please confirm.",
    "createdAt": "2026-11-01T10:12:00"
  },
  {
    "id": 13,
    "code": "ES-013",
    "name": "Kids T-shirts Pant Set",
    "shortDescription": "Set of 4 kids T-shirt and pant sets in yellow, blue, pink and green.",
    "fullDescription": "Four matching kids T-shirt and pant sets in yellow, blue, pink and green with fun prints. Ready-to-wear outfits at a pack price.",
    "category": {
      "id": 7,
      "name": "Kids Wear",
      "slug": "kids-wear"
    },
    "audience": "KIDS",
    "price": 599,
    "originalPrice": null,
    "discountPercent": null,
    "packInfo": "4 set",
    "sizes": [],
    "colours": [
      "Yellow",
      "Blue",
      "Pink",
      "Green"
    ],
    "imagePath": "https://res.cloudinary.com/ibdswcti/image/upload/v1795094555/kids-tshirts-pant-set.jpg",
    "inStock": true,
    "featured": true,
    "newArrival": true,
    "confirmationNote": "Price, pack size and photo are from the shop flyer. Fabric, available sizes and stock are not on the flyer - please confirm.",
    "createdAt": "2026-11-01T10:13:00"
  },
  {
    "id": 14,
    "code": "ES-014",
    "name": "Kids Pant",
    "shortDescription": "Pack of 5 kids pants in navy, olive, beige, maroon and grey.",
    "fullDescription": "A pack of 5 kids pants in navy, olive, beige, maroon and grey with elastic drawstring waists. Easy daily wear for growing kids.",
    "category": {
      "id": 7,
      "name": "Kids Wear",
      "slug": "kids-wear"
    },
    "audience": "KIDS",
    "price": 179,
    "originalPrice": null,
    "discountPercent": null,
    "packInfo": "5 pc",
    "sizes": [],
    "colours": [
      "Navy",
      "Olive",
      "Beige",
      "Maroon",
      "Grey"
    ],
    "imagePath": "https://res.cloudinary.com/ibdswcti/image/upload/v1795094554/kids-pant.jpg",
    "inStock": true,
    "featured": false,
    "newArrival": true,
    "confirmationNote": "Price, pack size and photo are from the shop flyer. Fabric, available sizes and stock are not on the flyer - please confirm.",
    "createdAt": "2026-11-01T10:14:00"
  },
  {
    "id": 15,
    "code": "ES-015",
    "name": "Kids Girl Coordset",
    "shortDescription": "Pack of 3 printed girls coord sets in pink, lavender and green.",
    "fullDescription": "A pack of 3 girls coord sets in pink, lavender and green prints with frill sleeves. Cute matching top-and-bottom outfits for parties and everyday wear.",
    "category": {
      "id": 7,
      "name": "Kids Wear",
      "slug": "kids-wear"
    },
    "audience": "KIDS",
    "price": 250,
    "originalPrice": null,
    "discountPercent": null,
    "packInfo": "3 pc",
    "sizes": [],
    "colours": [
      "Pink",
      "Lavender",
      "Green"
    ],
    "imagePath": "https://res.cloudinary.com/ibdswcti/image/upload/v1795094554/kids-girl-coordset.jpg",
    "inStock": true,
    "featured": true,
    "newArrival": false,
    "confirmationNote": "Price, pack size and photo are from the shop flyer. Fabric, available sizes and stock are not on the flyer - please confirm.",
    "createdAt": "2026-11-01T10:15:00"
  }
];

export default products;
