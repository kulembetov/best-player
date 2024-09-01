"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Player } from "@/player/Player";
import UploadVideoPage from "./upload-video/page";
import { Modal } from "./modal/page";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <h1 className="font-medium text-4xl text-center mt-16 mb-6">
        Minimalistic Player
      </h1>
      <div className="mb-12 text-center">
        <button
          onClick={openModal}
          className="text-center px-4 py-2 bg-primary rounded-xl hoverSecondary"
        >
          Upload a video
        </button>
      </div>
      <div className="flex items-center justify-center">
        <Player />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UploadVideoPage />
      </Modal>
    </>
  );
}
