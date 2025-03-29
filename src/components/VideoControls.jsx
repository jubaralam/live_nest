
const VideoControls = ({ controls }) => {
    return (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {controls?.map((control, index) => (
          <button
            key={index}
            onClick={control.action}
            className={`p-3 rounded-full ${
              control.isRed ? 'bg-red-500' : 'bg-gray-800'
            } text-white hover:opacity-90`}
          >
            <control.icon className="w-6 h-6" />
          </button>
        ))}
      </div>
    );
  };

  export default VideoControls