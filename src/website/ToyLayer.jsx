import Sparkles from './components/Sparkles'

export default function ToyLayer() {
    return (
        <div className="storybook-backdrop" aria-hidden="true">
            <Sparkles />
            <div className="sky-gradient" />
            <div className="sun">
                <span className="sun-ring sun-ring-1" />
                <span className="sun-ring sun-ring-2" />
            </div>
            <div className="cloud cloud-left" />
            <div className="cloud cloud-right" />
            <span className="bird bird-1" />
            <span className="bird bird-2" />
            <span className="bird bird-3" />
            <span className="butterfly" />
            <div className="hill hill-left" />
            <div className="hill hill-right" />
            <div className="tree tree-left">
                <span className="trunk" />
                <span className="canopy" />
            </div>
            <div className="tree tree-right">
                <span className="trunk" />
                <span className="canopy" />
            </div>
            <div className="toy-block toy-block-left">A</div>
            <div className="toy-block toy-block-right">B</div>
            <div className="toy-ball toy-ball-left" />
            <div className="toy-ball toy-ball-right" />
            <div className="ground-mist" />
        </div>
    )
}
