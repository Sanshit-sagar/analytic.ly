import React, { useState } from "react";
import { useEventEmitter, EventEmitterProvider } from "@visx/xychart";

const eventSourceId = "optional-source-id-filter";

const EmitEvent = () => {
  const emit = useEventEmitter();
  return (
    <button onPointerUp={(event) => emit("pointerup", event, eventSourceId)}>
      emit event
    </button>
  );
};

const SubscribeToEvent = () => {
  const [clickCount, setClickCount] = useState(0);
  const allowedEventSources = [eventSourceId];
  useEventEmitter(
    "pointerup",
    () => setClickCount(clickCount + 1),
    allowedEventSources
  );

  return <div>Emitted {clickCount} events</div>;
};

export default function Events() {
  return (
    <EventEmitterProvider>
      <EmitEvent />
      <SubscribeToEvent />
    </EventEmitterProvider>
  );
}
