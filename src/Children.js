import React from 'react';

function Wrapper(props) {

  console.log(React.Children);

  const nextChildren = React.Children
    .toArray(props.children)
    .filter(
    (item) => typeof item.type === 'function',
  );

  return (
    <section>
      <h1>testWrapper </h1>
      <article>
        {nextChildren}
      </article>
    </section>
  );
}

function TestChild() {
  return (<div> test child component </div>);
}

export default function Parent() {
  return (
    <div>
      <div> test </div>
      <div> test2</div>
      <Wrapper>
        <TestChild />
        <div> test html child </div>
        dfgfd
        dfgfdg
      </Wrapper>
    </div>
  );
}
