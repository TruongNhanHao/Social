import { useSelector } from "react-redux";
import styled from "styled-components";

const Stories = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "Trương Hồng Hải",
      img: "https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/273642400_1341930676248194_109292264743939230_n.jpg?stp=dst-jpg_p843x403&_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=DJq5YcTIsAYAX8aPeXB&_nc_ht=scontent.fsgn5-8.fna&oh=00_AfAlv1m7_90hHDU7iOWRKi2TLC_DoLZwDmL3r1TdYvdgRQ&oe=635FD75D",
    },
    {
      id: 2,
      name: "Dương Thành Thông",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQqOYtnykz1yqGRDF8xp3E9Mkciro_nB8dOVtp3JiqlB3DBG09Pp9SuzqQcdLp_9QVkQQ&usqp=CAU",
    },
    {
      id: 3,
      name: "Trương Nhân Hào",
      img: "https://scontent.fsgn5-11.fna.fbcdn.net/v/t1.6435-9/125527981_845909699489270_222170478004337658_n.jpg?stp=dst-jpg_s851x315&_nc_cat=111&ccb=1-7&_nc_sid=da31f3&_nc_ohc=jZ2OASaM1d8AX80hm96&_nc_ht=scontent.fsgn5-11.fna&oh=00_AfCTod8St-K4wwlMMPbiLK1VhMTJc99QkKTLXZeR7x96lw&oe=6382ECAC",
    },
    {
      id: 4,
      name: "Quốc Việt",
      img: "https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/296411460_800354384479514_308564821241493731_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_ohc=5S1tfY6Ex2AAX_WMcwU&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfDNnixsSYf--A9OPvWR-_GyKJDkKCbxo3y9sofd-AvFsw&oe=635FDB02",
    },
  ];

  return (
    <Wrapper>
      <div className="story">
        <img
          className="chatOnlineImg"
          src={
            currentUser?.profilePicture
              ? PF + currentUser.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
        />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  height: 250px;
  margin-bottom: 30px;

  .story {
    flex: 1;
    border-radius: 10px;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    span {
      position: absolute;
      bottom: 10px;
      left: 10px;
      color: white;
      font-weight: 500;
    }

    button {
      position: absolute;
      bottom: 40px;
      left: 10px;
      color: white;
      background-color: #5271ff;
      border: none;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      cursor: pointer;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
export default Stories;
