import P from '../components/paragraph'
import Post from '../components/post'
import GameContainer from '../components/game-container';

export default function Home() {
  return (
    <div className="main">
      <GameContainer />

      <hr />

      <Post title="My second blog post">
        <P>Hello there</P>
        <P>This is another example.</P>
        <P>Wa-hoo!</P>
      </Post>

      <hr />

      <Post title="The final blog post">
        <P>C’est fin</P>
      </Post>

      <style jsx>{`
      .main {
        margin: auto;
        max-width: 1020px;
        padding: 10px;
        text-align: center;
      }

        hr {
          width: 100px;
          border-width: 0;
          margin: 20px auto;
          text-align: center;
        }

        hr::before {
          content: '***';
          color: #ccc;
        }
      `}</style>
    </div>
  )
}
