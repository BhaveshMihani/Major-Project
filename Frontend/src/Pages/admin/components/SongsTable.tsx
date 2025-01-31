import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStores";
import { Calendar, Trash2 } from "lucide-react";

const SongsTable = () => {
  const { songs, isLoading, error } = useMusicStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Loading Songs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-zinc-800/50">
            <TableHead>Title</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>Realease Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song) => (
            <TableRow
            key={song._id} className="hover:bg-zinc-800/50">
              <TableCell>
                <img src={song.imageUrl} alt={song.title} className="size-10 rounded object-cover"/>
              </TableCell>
              <TableCell className="font-medium">{song.title}</TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 to-zinc-400">
                  <Calendar className="size-4" />
                  {song.releaseYear}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  onClick={()=>{}}>
                    <Trash2  size="size-4"/>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SongsTable;
