export default function BranchOptions({ libraries }) {
  return (
    <>
      {libraries.map(function handleLibrary(library) {
        return (
          <option key={library.id} value={library.id}>
            {library.name} — {library.branch}
          </option>
        );
      })}
    </>
  );
}
