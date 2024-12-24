// src/data/postsData.js

const postsData = [
  {
    id: 1,
    username: "john_doe",
    profilePic: "https://www.beautycrew.com.au/media/55194/vanilla-girl.png",
    image:
      "https://merchantantiques.in/cdn/shop/files/WhatsAppImage2024-06-24at1.40.01PM_1_8fc5bd16-eae2-44b5-a3af-bf32e434a995.jpg?v=1719398342",
    title: "This is amazing bike",
    likes: [
      { userId: "user123", username: "jane_smith" },
      { userId: "user456", username: "mark_jones" },
    ],
    comments: [
      { userId: "user789", username: "sarah_lee", comment: "Amazing view!" },
      {
        userId: "user321",
        username: "paul_kim",
        comment: "Wish I were there!",
      },
    ],
    timestamp: "2024-12-08T12:34:56Z",
  },
  {
    id: 2,
    username: "jane_doe",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq66TwZTFF_T7Q04v03pBsfQqaWvYh7SHAeQ&s",
    image:
      "https://thumbs.dreamstime.com/b/breathtaking-tropical-beach-scene-swaying-palm-trees-mesmerizing-sunset-330195710.jpg",
    title: "Beach vibes 🌊",
    likes: [],
    comments: [],
    timestamp: "2024-12-07T10:20:00Z",
  },
  {
    id: 3,
    username: "Abusad",
    profilePic: "https://example.com/profile-pic2.jpg",
    image:
      "https://www.godrej-ananda.net.in/images/other/how-bangalore-got-its-name.webp",
    title: "Bangalore 🚗",
    likes: [],
    comments: [],
    timestamp: "2024-12-07T10:20:00Z",
  },
];

export default postsData;
