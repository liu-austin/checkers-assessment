import GameContainer from '../components/game-container';

export default function Home() {
  return (
    <div className="main">
      <GameContainer />

      <hr />

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
