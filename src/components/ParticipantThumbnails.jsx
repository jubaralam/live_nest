const ParticipantThumbnails = () => {
    const participants = [
      { id: 1, name: 'Casey', isActive: true },
      { id: 2, name: 'John', isActive: true },
      { id: 3, name: 'Sarah', isActive: false },
      { id: 4, name: 'Jack', isActive: true },
    ];
  
    return (
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {participants.map((participant) => (
          <div key={participant.id} className="relative">
            <img
              src={`/api/placeholder/64/64`}
              alt={participant.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div
              className={`absolute bottom-1 right-1 w-3 h-3 rounded-full ${
                participant.isActive ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
          </div>
        ))}
      </div>
    );
  };
  
  export default ParticipantThumbnails