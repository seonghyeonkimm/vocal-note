import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import useFirebaseStorage from "./useFirebaseStorage";

const useRecordHistory = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const router = useRouter();
  const storage = useFirebaseStorage();

  useEffect(() => {
    const id = router.query.id as string;
    if (!id) return;

    const listRef = storage.child(id);
    listRef.listAll()
      .then((res) => {
        const filenames = [];
        const promises = [];
        res.items.forEach((itemRef) => {
          filenames.push(itemRef.name);
          promises.push(itemRef.getDownloadURL())
        });
        Promise.all(promises).then(urls => {
          setData(filenames.map((filename, index) => ({ filename, url: urls[index] })));
          setLoading(false);
        });
      })
  }, [])

  return { data, loading };
}

export default useRecordHistory;
