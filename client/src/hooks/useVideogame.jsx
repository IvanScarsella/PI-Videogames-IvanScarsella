import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideogameDetail } from "../redux/actions/actions";

const useVideogame = () => {

  const dispatch = useDispatch();
  const videogameDetail = useSelector((state) => state.videogameDetail);
  const { detailId } = useParams();

  useEffect(() => {
    dispatch(getVideogameDetail(detailId));
  }, [detailId])

  return videogameDetail
}

export default useVideogame;