import { MinusCircleIcon, PlusCircle, PlusCircleIcon } from "lucide-react";
import { useState } from "react";

const QuantityStepper = ({quantity,setQuantity}) => {

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
        className="rounded px-3 py-1"
      >
        <MinusCircleIcon></MinusCircleIcon>
      </button>
      <input
        type="number"
        value={quantity}
        readOnly
        className="mx-auto w-10 rounded border text-center font-semibold pl-2"
      />
      <button
        onClick={() => setQuantity((prev) => prev + 1)}
        className="rounded px-3 py-1"
      >
        <PlusCircleIcon></PlusCircleIcon>
      </button>
    </div>
  );
};

export default QuantityStepper;
