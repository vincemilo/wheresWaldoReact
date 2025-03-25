export default function CharacterPortraits({
  foundCharacters,
  checkmark,
  portraits,
}) {
  return (
    <div className="character-portraits">
      <div className="character-portrait">
        <img src={foundCharacters["waldo"] ? checkmark : portraits.waldoHead} />
        Waldo
      </div>
      <div className="character-portrait">
        <img src={foundCharacters["wilma"] ? checkmark : portraits.wilmaHead} />
        Wilma
      </div>
      <div className="character-portrait">
        <img
          src={foundCharacters["wizard"] ? checkmark : portraits.wizardHead}
        />
        Wizard
      </div>
      <div className="character-portrait">
        <img src={foundCharacters["odlaw"] ? checkmark : portraits.odlawHead} />
        Odlaw
      </div>
    </div>
  );
}
