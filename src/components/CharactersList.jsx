import CharacterItem from './CharacterItem';

const CharactersList = ({ characters, onSelect }) => (
  <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
    {characters.map((character) => (
      <CharacterItem
        key={character.id}
        {...character}
        onSelect={() => onSelect(character.id)}
      ></CharacterItem>
    ))}
  </ul>
);

export default CharactersList;
