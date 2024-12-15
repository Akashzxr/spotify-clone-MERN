import { useSelector } from "react-redux";
import SearchCard from "../components/SearchCard";

function Playlist() {
  const songs = useSelector((state) => state.song.playlistSongs);
  return (
    <div className="text-white bg-background-gray w-full font-spotifytitle flex gap-8 flex-col max-h-78.1vh overflow-y-auto items-center py-7">
    {
      songs.length ? 
      songs.map((items, index) => (
          <SearchCard key={index} data={items} index={index} />
        ))
       : <h1 className="font-spotifytitle text-2xl max-h-3 my-auto">There is nothing to show</h1>
    }
  </div>
  );
}

export default Playlist;
