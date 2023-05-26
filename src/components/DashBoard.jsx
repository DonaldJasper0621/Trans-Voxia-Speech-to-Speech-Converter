import React from 'react';

const Dashboard = () => {

  // Sample static data
  const videoList = [
    { _id: 1, thumbnail_path: 'thumbnail1.jpg', uploader_name: 'User1', upload_title: 'Video_Title_1' },
    { _id: 2, thumbnail_path: 'thumbnail2.jpg', uploader_name: 'User2', upload_title: 'Video_Title_2' },
    // Add more items here...
  ]

  const videos = videoList.map(video => (
    <div className="video col-xs-12 col-sm-12 col-md-3 col-lg-4" key={video._id}>
      <div className="video-thumbnail">
        <img src={video.thumbnail_path} alt="video thubmnail" />
      </div>
      <span className="username">
        {video.uploader_name}
      </span>
      <span className="video-title">{video.upload_title.replace(/_/g, ' ')}</span>
    </div>
  ));

  return (
    <React.Fragment>
      <div className="container mt-5">
        <h4>Videos</h4>
        <hr className="my-4" />

        <div className="streams row">
          {videos}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
