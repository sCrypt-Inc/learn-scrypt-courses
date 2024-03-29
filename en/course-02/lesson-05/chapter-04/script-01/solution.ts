import { useEffect, useState } from 'react';
import artifact from './contracts/zkBattleship.json'


export function WelcomeScreen(props: any) {

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    props.setArtifact(artifact)
    setLoading(false)
  });

  return (
    <main>
      <h2 className="tip-box-title">Rules</h2>
      <p className="player-tip">
        You and your opponent are competing navy commanders. Your fleets are positioned at
        secret coordinates, and you take turns firing torpedoes at each other. The first
        to sink the other person’s whole fleet wins!
      </p>
      <button onClick={props.startPlay}>{loading ? "loading..." : "Play"}</button>
    </main>
  );
};

