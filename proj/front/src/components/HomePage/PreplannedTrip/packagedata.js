const trips = [

  {
    id: 1,
    title: 'Cultural Exploration - Lahore & Multan',
    description: 'Experience the cultural richness of Lahore and Multan.',
    image:"https://www.zameen.com/news/wp-content/uploads/2014/12/m4-600x265.jpg",
    cities: [
      { name: 'Lahore', days: 2 },
      { name: 'Multan', days: 2 }
    ],
  },
  {
    id: 2,
    title: '3 Days Adventure - Islamabad & Murree',
    description: 'Enjoy the urban charm of Islamabad and the serene hills of Murree.',
    image:"https://explorepakistan.ca/wp-content/uploads/2019/05/ISALAMABAD-–-MURREE-TOUR.jpg",
    cities: [
      { name: 'Islamabad', days: 1 },
      { name: 'Murree', days: 2 }
    ],
  },
  {
    id: 3,
    title: 'Urban & Coastal Fun - Karachi & Quetta',
    description: 'Enjoy the bustling metropolis of Karachi and vibrant Quetta.',
    image:"https://mediaim.expedia.com/destination/9/3b00c100e7c2d0a47a31f2bf6f50bdd4.jpg",
    cities: [
      { name: 'Karachi', days: 1 },
      { name: 'Quetta', days: 2 }
    ],
  },
  {
    id: 4,
    title: '4 DAYS TRIP TO Northern Beauty - Skardu & Hunza',
    description: 'Explore the breathtaking valleys of Skardu,  and Hunza.',
    image: 'https://i.dawn.com/primary/2015/04/552534a77b507.jpg?r=961640394',
    cities: [
      { name: 'Skardu', days: 2 },
      { name: 'Hunza', days: 2 },
    ],
  },

  {
    id: 5,
    title: 'Historical Journey - Quetta and Peshawar',
    description: 'Discover the rich history of Quetta and Peshawar.',
    image:"https://cdn.britannica.com/02/127002-050-084ED6E6/Islamia-College-Peshawar-Pakistan-North-West-Frontier-Province.jpg",
    cities: [
      { name: 'Quetta', days: 2 },
      { name: 'Peshawar', days: 2 }
    ],
  },
  {
    id: 6,
    title: 'Hill Station Retreat - Murree and Abbottabad',
    description: 'Relax in the scenic hill stations of Murree and Abbottabad.',
    image:"https://www.getout.pk/pakistan/wp-content/uploads/2018/12/The-Murree-city-Kashmir-Point-Pakistan.-Image.png",
    cities: [
      { name: 'Murree', days: 2 },
      { name: 'Abbottabad', days: 2 }
    ],
  },
  {
    id: 7,
    title: 'Valley Exploration - Kashmir and Naran',
    description: 'Witness the mesmerizing valleys of Kashmir and Naran.',
    image:"https://seepakistantours.com/wp-content/uploads/2019/02/Naran-Kaghan-Neelum-7-Days-Tour.jpg",
    cities: [
      { name: 'Kashmir', days: 2 },
      { name: 'Naran', days: 2 }
    ],
  },
  {
    id: 8,
    title: 'Nature & Serenity - Gilgit & Batakundi',
    description: 'Embrace the serenity of Gilgit and Batakundi.',
    image:"https://www.pakistantravelguide.pk/wp-content/uploads/2016/11/phandar-valley.png",
    cities: [
      { name: 'Gilgit', days: 1 },
      { name: 'Batakundi', days: 1 }
    ],
  },
  
    {
      id: 9,
      title: 'Historical & Urban Adventure for 5 Days  - Lahore, Islamabad ',
      description: 'Experience the rich culture and modern vibes of Lahore, Islamabad.',
      image: 'https://i0.wp.com/www.pakistangulfeconomist.com/wp-content/uploads/2017/10/Islamabad.jpg?fit=1045%2C600&ssl=1',
      cities: [
        { name: 'Lahore', days: 3 },
        { name: 'Islamabad', days: 2 },
      ],
    },
    {
      id: 10,
      title: 'Majestic Historical Escapade for 3 Days  - Maultan and Peshawar',
      description: 'Discover the stunning history in Peshawar and Multan.',
      image: 'https://tripjive.com/wp-content/uploads/2024/12/Multan-Fort-historical-fortress-UNESCO-World-Heritage-site-1024x585.jpg',
      cities: [
        { name: 'Multan', days: 2 },
        { name: 'Peshawar', days: 1 },
      ],
    },
  {
    id: 11,
    title: 'Nature Expedition - Skardu, Hunza & Gilgit',
    description: 'Experience the natural beauty of Skardu, Hunza, and Gilgit.',
    image:"https://www.jasminetours.com/wp-content/uploads/2023/08/hunza-valley2-1920-1.jpg",
    cities: [
      { name: 'Skardu', days: 1 },
      { name: 'Hunza', days: 1 },
      { name: 'Gilgit', days: 2 }
    ],
  },
  {
    id: 12,
    title: 'Cultural Heritage - Lahore, Multan & Quetta',
    description: 'Dive into the cultural heritage of Lahore, Multan, and Quetta.',
    image:"https://www.pncu.gov.pk/SiteImage/Misc/images/takht-i-bahi.jpg",
    cities: [
      { name: 'Lahore', days: 2 },
      { name: 'Multan', days: 1 },
      { name: 'Quetta', days: 2 }
    ],
  },
  {
    id: 13,
    title: 'Mountain Adventure - Naran, Batakundi & Gilgit',
    description: 'Explore the mountain ranges of Naran, Batakundi, and Gilgit.',
    image:"https://upload.wikimedia.org/wikipedia/commons/5/57/Batakundi_naran_KPK.jpg",

    cities: [
      { name: 'Naran', days: 2 },
      { name: 'Batakundi', days: 1 },
      { name: 'Gilgit', days: 2 }
    ],
  },
  {
    id: 14,
    title: 'Urban Excursion - Karachi, Lahore & Islamabad',
    description: 'Discover the urban life in Karachi, Lahore, and Islamabad.',
    image:"https://www.pakistaneconomist.com/files/wp-content/uploads/2017/10/punjab.jpg",
    cities: [
      { name: 'Karachi', days: 1 },
      { name: 'Lahore', days: 2 },
      { name: 'Islamabad', days: 2 }
    ],
  },
  {
    id: 15,
    title: 'Lakes & Valleys - Naran & Batakundi',
    description: 'Marvel at the lakes and valleys of Naran and Batakundi.',
    image:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/5e/84/76/count-the-jeeps-on-lake.jpg?w=1200&h=900&s=1",
    cities: [
      { name: 'Naran', days: 2 },
      { name: 'Batakundi', days: 2 }
    ],
  },
  {
    id: 16,
    title: 'Discover the Cultural Heritage of Multan & Quetta for 4 Days',
    description: 'Discover the historical richness of Multan and Quetta.',
    image: 'https://www.porterpakistan.com/uploads/2020/01/Mariabad.jpg',
    cities: [
      { name: 'Multan', days: 2 },
      { name: 'Quetta', days: 2 },
    ],
  },

  {
    id: 17,
    title: 'Twin City Delight - Lahore & Hunza',
    description: 'Enjoy the cultural and modern mix of Lahore and Hunza.',
    image:"https://www.shahidtourguide.com/wp-content/uploads/2023/09/Hunza-cherry-blossom-1.jpg",
    cities: [
      { name: 'Lahore', days: 2 },
      { name: 'Hunza', days: 2 }
    ],
  },
  {
    id: 18,
    title: 'Southern Cultural Journey - Karachi & Quetta',
    description: 'Discover the cultural richness of Karachi and Quetta.',
    image:"https://www.youlinmagazine.com/articles/heritage-walk-karachi.jpg",
    cities: [
      { name: 'Karachi', days: 2 },
      { name: 'Quetta', days: 2 }
    ],
  },
  {
    id: 19,
    title: 'Discover the Cultural Heritage of Peshawar in 2 Days',
    description: 'Discover the culture of Pakistan in Peshawar ',
    image: 'https://skyticket.com/guide/wp-content/uploads/2017/12/iStock-538601654-e1540535918101.jpg',
    cities: [
      { name: 'Peshawar', days: 2 },
      
    ],
  },
  {
    id: 20,
    title: 'Northern Gems - Skardu, Hunza & Gilgit',
    description: 'Explore the breathtaking beauty of Skardu, Hunza, and Gilgit.',
    image:"https://trangoadventure.com/wp-content/uploads/2024/03/Northern-Pakistan-Tour-scaled.jpg",
    cities: [
      { name: 'Skardu', days: 2 },
      { name: 'Hunza', days: 1 },
      { name: 'Gilgit', days: 2 }
    ],
  },
  
  {
    id: 21,
    title: 'Southern Coastline - Karachi ',
    description: 'A journey through the coastal beauty of Karachi ',
    image:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/3f/cc/ba/20190407-183906-largejpg.jpg?w=800&h=500&s=1",
    cities: [
      { name: 'Karachi', days: 2 },
      {name:'Abbottabad',days:1}
    ],
  },
  {
    id: 22,
    title: 'Hill Station Getaway - Murree & Abbottabad',
    description: 'Escape to the cool hill stations of Murree and Abbottabad.',
    image:"https://images.travelandleisureasia.com/wp-content/uploads/sites/7/2024/02/01171614/murree-ramsha-asad-unsplash-feature.jpeg?tr=w-1200,q-60",
    cities: [
      { name: 'Murree', days: 2 },
      { name: 'Abbottabad', days: 2 }
    ],
  },
  {
    id: 23,
    title: 'Cultural Heritage - Lahore & Quetta',
    description: 'Explore the deep cultural heritage of Lahore and Quetta.',
    image:"https://propakistani.pk/wp-content/uploads/2020/06/Untitled-design-33.png",
    cities: [
      { name: 'Lahore', days: 2 },
      { name: 'Quetta', days: 2 }
    ],
  },
  {
    id: 24,
    title: 'Northern Exploration - Skardu, Hunza & Kashmir',
    description: 'Experience the serene beauty of Skardu, Hunza, and Kashmir.',
    image:"https://res.cloudinary.com/odysseytraveller/image/fetch/f_auto,q_auto,dpr_auto,r_4,w_765,h_535.5,c_limit/https://cdn.odysseytraveller.com/app/uploads/2019/11/Springtime-view-of-mountain-peaks-in-the-Hunza-Valley-Pakistan.jpg",
    cities: [
      { name: 'Skardu', days: 2 },
      { name: 'Hunza', days: 1 },
      { name: 'Kashmir', days: 2 }
    ],
  },
  {
    id: 25,
    title: 'Twin Adventures - Abbottabad & Peshawar',
    description: 'Blend the modern life of Islamabad with the historical essence of Peshawar.',
    image:"https://www.apricottours.pk/wp-content/uploads/2015/02/Thandiani-Abbottabad-Tour-5.jpg",
    cities: [
      { name: 'Abbottabad', days: 2 },
      { name: 'Peshawar', days: 2 }
    ],
  },
  {
    id: 26,
    title: 'Mountain & Culture - Gilgit & Quetta',
    description: 'Discover the mountains of Gilgit and the history of Quetta.',
    image:"https://realpakistan.com.pk/wp-content/uploads/2024/11/Exploring-Gilgit-A-Hidden-Gem-in-the-Heart-of-the-Himalayas.jpg",
    cities: [
      { name: 'Gilgit', days: 2 },
      { name: 'Quetta', days: 2 }
    ],
  },
  {
    id: 27,
    title: 'Peaceful Escapes - Naran & Kashmir',
    description: 'Relax amidst the peaceful surroundings of Naran and Kashmir.',
    image:"https://seepakistantours.com/wp-content/uploads/2022/04/Destination-Naran-Kaghan.jpg",
    cities: [
      { name: 'Naran', days: 2 },
      { name: 'Kashmir', days: 2 }
    ],
  },
  {
    id: 28,
    title: 'Cultural Exploration - Lahore & Skardu',
    description: 'Dive into the cultural beauty of Lahore and skardu.',
    image:"https://www.shahidtourguide.com/wp-content/uploads/2023/09/Skardu-2-1.jpg",
    cities: [
      { name: 'Lahore', days: 2 },
      { name: 'Skardu', days: 2 }
    ],
  },
  {
    id: 29,
    title: 'Quaint Cities - Murree & Skardu',
    description: 'Take in the cool vibes of Murree and the majestic landscapes of Skardu.',
    image:"https://www.apricottours.pk/wp-content/uploads/2024/01/Shangrilla-Skardu.jpeg",
    cities: [
      { name: 'Murree', days: 2 },
      { name: 'Skardu', days: 2 }
    ],
  },
  {
    id: 30,
    title: 'Coastal Adventure - Karachi & Skardu',
    description: 'A blend of Karachi’s coast and the breathtaking beauty of Skardu.',
    image:"https://guidetopakistan.pk/wp-content/uploads/2024/10/Sandspit-Beach.png",
    cities: [
      { name: 'Karachi', days: 2 },
      { name: 'Skardu', days: 2 }
    ],
  },
  {
    id: 31,
    title: 'Tour of Most MesmerizingCity & Mountains - Lahore & Naran',
    description: 'Discover the urban delights of Lahore and the majestic mountains of Naran.',
    image:"https://miro.medium.com/v2/resize:fit:1400/1*pBumHXBZZ-RnuZJAQynQ7g.jpeg",
    cities: [
      { name: 'Lahore', days: 2 },
      { name: 'Naran', days: 2 }
    ],
  },
  {
    id: 32,
    title: 'Historical & Modern - Peshawar & Islamabad',
    description: 'Explore the rich history of Peshawar and the modern charm of Islamabad.',
    image:"https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0f/d8/9a/50.jpg",
    cities: [
      { name: 'Peshawar', days: 2 },
      { name: 'Islamabad', days: 2 }
    ],
  },
  {
    id: 33,
    title: 'Northern Discovery - Skardu & Naran',
    description: 'Venture into the mountains of Skardu and Naran.',
    image:"https://www.imusafir.pk/wp-content/uploads/2023/10/skardu-11b-1.jpg",
    cities: [
      { name: 'Skardu', days: 2 },
      { name: 'Naran', days: 2 }
    ],
  },
  {
    id: 34,
    title: 'Urban Adventure - Karachi & Lahore',
    description: 'Experience the bustling life of Karachi and Lahore.',
    image:"https://t3.ftcdn.net/jpg/03/07/58/86/360_F_307588607_gxuDKAIqEwknbrBgpQ3pQiNWKyLmWI93.jpg",
    cities: [
      { name: 'Karachi', days: 2 },
      { name: 'Lahore', days: 2 }
    ],
  },
  {
    id: 35,
    title: 'Cultural Blend - Multan & Islamabad',
    description: 'Explore the historical city of Multan and the modern beauty of Islamabad.',
    image:"https://flypakistan.pk/assets/img/City/Multan.jpg",
    cities: [
      { name: 'Multan', days: 2 },
      { name: 'Islamabad', days: 2 }
    ],
  },
  {
    id: 36,
    title: 'Gems of the North - Gilgit & Hunza',
    description: 'Experience the natural beauty of Gilgit and Hunza.',
    image:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/d5/1c/94/passu-valley-hunza-valley.jpg?w=800&h=-1&s=1",
    cities: [
      { name: 'Gilgit', days: 2 },
      { name: 'Hunza', days: 2 }
    ],
  },
  {
    id: 37,
    title: 'Heritage & Adventure - Quetta & Skardu',
    description: 'Blend the heritage of Quetta with the adventure of Skardu.',
    image:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRJWaAvVf3cEypAmJkPT8hTLce5eXvetZTOQnYAtVDIygFFsZVEP7rBJCU3HQHPFeFFmJfLM5Q1mAlw_Q",
    cities: [
      { name: 'Quetta', days: 2 },
      { name: 'Skardu', days: 2 }
    ],
  },
  {
    id: 38,
    title: 'Mountain & Culture - Gilgit & Lahore',
    description: 'Experience the cultural richness of Lahore with the natural beauty of Gilgit.',
    image:"https://cdn-blog.zameen.com/blog/wp-content/uploads/2019/04/cover-image-40.jpg",
    cities: [
      { name: 'Gilgit', days: 2 },
      { name: 'Lahore', days: 2 }
    ],
  },
  {
    id: 39,
    title: 'Hidden Beauty - Batakundi & Gilgit',
    description: 'Unveil the hidden gems of Batakundi and Gilgit.',
    image:"https://upload.wikimedia.org/wikipedia/commons/5/57/Batakundi_naran_KPK.jpg",
    cities: [
      { name: 'Batakundi', days: 2 },
      { name: 'Gilgit', days: 2 }
    ],
  },
  {
    id: 40,
    title: 'Urban Delight - Lahore, Islamabad & Karachi',
    description: 'Experience the charm of Lahore, Islamabad, and Karachi.',
    image:"https://media.licdn.com/dms/image/D4D12AQHFGdOF7AtMmw/article-cover_image-shrink_600_2000/0/1709020518241?e=2147483647&v=beta&t=k3JcbBqoKEkteKNRpcJhr8uzz4llJFGKQjxwijmjmHY",
    cities: [
      { name: 'Lahore', days: 2 },
      { name: 'Islamabad', days: 2 },
      { name: 'Karachi', days: 1 }
    ],
  },
  {
    id: 41,
    title: 'Serenity & Culture - Murree & Kashmir',
    description: 'Relax in the serenity of Murree and explore the culture of Kashmir.',
    image:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/21/dd/19/murree.jpg?w=1200&h=-1&s=1",
    cities: [
      { name: 'Murree', days: 2 },
      { name: 'Kashmir', days: 2 }
    ],
  },
  {
    id: 42,
    title: 'Mountain Expedition - Naran & Hunza',
    description: 'Experience the mountainous beauty of Naran and Hunza.',
    image:"https://seepakistantours.com/wp-content/uploads/2019/02/Hunza-Naran-Shogran-10-Days-summer-Tour.jpg",
    cities: [
      { name: 'Naran', days: 2 },
      { name: 'Hunza', days: 2 }
    ],
  },
  {
    id: 43,
    title: 'Cultural & Natural Mix - Multan & Chitral',
    description: 'Discover the cultural and natural beauty of Multan and Chitral.',
    image:"https://visitinpakistan.com/wp-content/uploads/2023/06/Top-Tourist-Attractions-in-Chitral-Shandur_Top__Shandur_Lake-1024x631.jpg",
    cities: [
      { name: 'Multan', days: 2 },
      { name: 'Chitral', days: 2 }
    ],
  },
  {
    id: 44,
    title: 'Heritage & Nature - Peshawar & Naran',
    description: 'Explore the heritage of Peshawar and the natural beauty of Naran.',
    image:"https://guidetopakistan.pk/wp-content/uploads/2021/04/Naran-37.jpg",
    cities: [
      { name: 'Peshawar', days: 2 },
      { name: 'Naran', days: 2 }
    ],
  },
  {
    id: 45,
    title: 'Quetta & Naran Expedition',
    description: 'A journey through the historic Quetta and the natural wonders of Naran.',
    image:"https://facts.net/wp-content/uploads/2023/07/39-facts-about-quetta-1688735397.jpg",
    cities: [
      { name: 'Quetta', days: 2 },
      { name: 'Naran', days: 2 }
    ],
  },
  {
    id: 46,
    title: 'Adventure & Serenity - Batakundi & Murree',
    description: 'Find the adventure in Batakundi and serenity in Murree.',
    image:"https://www.blizin.com/public/images/uploads/tourpackage/7-days-tour-to-murree-naran-kaghan-TP-378-1602742837.jpg",
    cities: [
      { name: 'Batakundi', days: 2 },
      { name: 'Murree', days: 2 }
    ],
  },
  {
    id: 47,
    title: 'Cultural Expedition - Quetta & Abbottabad',
    description: 'Discover the cultural richness of Quetta and the natural beauty of Abbottabad.',
    image:"https://upload.wikimedia.org/wikipedia/commons/d/d2/View_of_Abbotabad.JPG",
    cities: [
      { name: 'Quetta', days: 2 },
      { name: 'Abbottabad', days: 2 }
    ],
  },
  {
    id: 48,
    title: 'Karachi & Peshawar Adventure',
    description: 'Explore Karachi’s vibrant culture and Peshawar’s historical richness.',
    image:"https://hunzaexplorers.com/storage/2017/06/Peshawar-City-HunzaExplorers-Pakistan.webp",
    cities: [
      { name: 'Karachi', days: 2 },
      { name: 'Peshawar', days: 2 }
    ],
  },
 
 
];

export default trips;