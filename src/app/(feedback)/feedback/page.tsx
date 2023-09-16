import FeedbackItem from "./(components)/FeedbackItem";
import FeedbackTextBox from "./(components)/FeedbackTextBox";

const allItems = [
  {
    id: "1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean augue sapien, tempor at diam vitae, varius molestie enim. Nulla commodo arcu pharetra consequat fringilla. Donec et nisi et lorem egestas rhoncus. Praesent ut mi sem. Fusce a ullamcorper massa. Nulla facilisi. Fusce semper nibh quis orci dictum dictum. Morbi hendrerit, libero a dictum vestibulum, lorem lectus rhoncus libero, eget porttitor quam dui ut neque. Cras tortor tellus, porttitor id dictum idlorem ipsum dolor sit amet consectetur adipisicing elit dolorem repudiandae nesciunt suscipit corrupti consequuntur",
    likes: 1,
  },
  { id: "2", text: "No me carga la página", likes: 0 },
  {
    id: "3",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean augue sapien, tempor at diam vitae, varius molestie enim. Nulla commodo arcu pharetra consequat fringilla. Donec et nisi et lorem egestas rhoncus. Praesent ut mi sem. Fusce a ullamcorper massa. Nulla facilisi. Fusce semper nibh quis orci dictum dictum. Morbi hendrerit, libero a dictum vestibulum",
    likes: 32,
  },
  {
    id: "4",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean augue sapien, tempor at diam vitae, varius molestie enim. Nulla commodo arcu pharetra consequat fringilla. Donec et nisi et lorem egestas rhoncus.",
    likes: 3,
  },
];

function Page() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <FeedbackTextBox />

      {allItems.map((item) => (
        <FeedbackItem key={item.id} data={item} />
      ))}
    </div>
  );
}

export default Page;
