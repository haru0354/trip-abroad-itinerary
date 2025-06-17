"use client";

import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { addTrip } from "../../action/actionTrip";
import { useModal } from "@/app/hooks/useModal";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";
import FormTrip from "./FormTrip";
import Button from "@/app/components/ui/button/Button";

const AddTripModal = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <button
        onClick={() => openModal("trip")}
        className="group flex flex-col items-center justify-center w-[340px] h-[347px] mx-4 mt-7 mb-6 border-2 rounded shadow-xl border-gray-400 bg-gradient-to-br from-sky-50 to-indigo-100 hover:from-indigo-200 hover:to-sky-100 hover:text-white transition duration-300"
      >
        <FontAwesomeIcon
          icon={faPlus}
          className="text-sky-600 group-hover:opacity-80 transition duration-300"
          style={{ fontSize: "8em" }}
        />
        <span className="mt-2 font-bold text-2xl text-gray-700 group-hover:opacity-80 transition duration-300">
          旅行のしおりを追加
        </span>
      </button>
      {isModalOpen("trip") &&
        createPortal(
          <AnimatedItem
            onClick={() => closeModal("trip")}
            className="fixed flex z-[200] justify-center items-center w-full h-full top-0 left-0 bg-gray-500 bg-opacity-90"
            elementType="div"
            animation="fadeInVariants"
          >
            <div
              className="relative w-full mx-2 p-4  border rounded border-gray-500  max-w-[620px] max-h-[70vh] overflow-y-auto bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <FormTrip buttonName="追加" formAction={addTrip} modalId="trip" />
              <Button
                onClick={() => closeModal("trip")}
                color="gray"
                size="normal"
                type="button"
                className="my-4 rounded"
              >
                閉じる
              </Button>
            </div>
          </AnimatedItem>,
          document.body
        )}
    </>
  );
};

export default AddTripModal;
