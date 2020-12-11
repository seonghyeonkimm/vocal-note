import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import useFirebaseStorage from "./useFirebaseStorage";

const useRecordHistory = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();
  const storage = useFirebaseStorage();

  const fetchRecordHistory = async () => {
    const id = router.query.id as string;
    if (!id) return;

    setLoading(true);
    const listRef = storage.child(id);
    const res = await listRef.listAll();

    const filenames = [];
    const promises = [];

    res.items.forEach((itemRef) => {
      promises.push(itemRef.getDownloadURL())
      filenames.push({ filename: itemRef.name, fullPath: itemRef.fullPath });
    });

    const urls = await Promise.all(promises);
    setData(filenames.map((filename, index) => ({ ...filename, url: urls[index] })).reverse());
    setLoading(false);
  }

  // init
  useEffect(() => {
    fetchRecordHistory();
  }, [router.query.id])

  return { data, loading, reload: fetchRecordHistory };
}

export default useRecordHistory;
