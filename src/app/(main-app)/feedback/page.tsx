import FeedbackItem from "./(components)/FeedbackItem";
import FeedbackInputBox from "./(components)/FeedbackInputBox";

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
    <div>
      <h1 className="text-6xl font-bold text-emerald-950 mt-8 text-center">
        Feedback
      </h1>
      <h2 className="text-xl text-center text-teal-800 mt-6 mb-10">
        Ayúdanos a mejorar
      </h2>
      <div className="mx-auto flex max-w-3xl flex-col justify-start gap-6">
        <FeedbackInputBox />

        {allItems.map((item) => (
          <FeedbackItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}

export default Page;
