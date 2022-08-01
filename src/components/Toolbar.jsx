import Checkbox from './Checkbox';

function Toolbar({ bannerVisible, feedOptions, handleEntityList }) {
  if (!bannerVisible) {
    return (
      <div className="toolbar">
        <h3>Feed Options</h3>
        <fieldset>
          <legend>Select a Feed</legend>
          {feedOptions.map((option) => (
            <div>
              <Checkbox name={option} handleEntityList={handleEntityList} />
            </div>
          ))}
        </fieldset>
      </div>
    );
  }
}

export default Toolbar;
