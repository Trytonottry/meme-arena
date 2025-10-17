import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./../styles/animations.css";

export default function Bracket({ rounds }) {
  return (
    <TransitionGroup className="bracket-container">
      {rounds.map((round, i) => (
        <CSSTransition key={i} timeout={400} classNames="fade">
          <div className="round">
            <h3 className="round-title">Раунд {i + 1}</h3>
            <div className="matchups">
              {round.map((match, j) => (
                <div key={j} className="matchup">
                  <img src={match.meme1.url} alt="" className="meme-thumb" />
                  <span>vs</span>
                  <img src={match.meme2.url} alt="" className="meme-thumb" />
                </div>
              ))}
            </div>
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
