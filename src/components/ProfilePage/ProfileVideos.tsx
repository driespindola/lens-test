//mapping for the prfile vids
import React, { useRef, useState } from 'react';
import Link from "next/link";
import { PublicationsDocument, PublicationsQueryRequest, PaginatedPublicationResult} from "@/types/lens";
import { useQuery } from "@apollo/client";
import { useRouter } from 'next/router';
import { BsPlay } from "react-icons/bs";
import Loader from '../UI/Loader';
import { Player } from '@livepeer/react';
import getMedia from '@/lib/getMedia';

const ProfileVideos = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { id } = router.query

  const { data, loading, error } = useQuery
  <{publications: PaginatedPublicationResult}>
  ((PublicationsDocument), {
    variables: { 
      request: {
        profileId: id,
        publicationTypes: ["POST"],
        limit: 10,
        metadata: {
          mainContentFocus: ["VIDEO"],
        },
      }
     },
  });

  if (loading) {
    return <Loader message="Loading videos" />;
  }

  const publications = data?.publications.items;
  console.log("DATA", data?.publications?.items);

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div>
      {publications?.length === 0 ? (
        <p className="text-center">No videos yet</p>
        ) : (
        <div className="grid gap-2 mr-2 mt-2 lg:grid-cols-3 md:gap-y-8 gap-y-2 3xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1">
          {publications?.map((pub) => (
            <div key={pub.id}>
              <Link href={`/detail/${pub.id}`} key={pub.id}>
                <a className="block h-0 relative pb-[131%]">
                  <div className="absolute inset-0 h-full w-full object-cover rounded">
                    <Player
                      title={`${pub?.metadata?.name}`}
                      loop
                      muted
                      controls={{autohide: 0, hotkeys: false}}
                      aspectRatio="9to16"
                      src={getMedia(pub)}
                    ></Player>
                  </div>
                  <BsPlay onClick={onVideoClick} className="absolute left-3 bottom-3 fill-white w-7 h-7" />
                </a>
              </Link>
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {pub.metadata.name}
                </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )}
  
  export default ProfileVideos;