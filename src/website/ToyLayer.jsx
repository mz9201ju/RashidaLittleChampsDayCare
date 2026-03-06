import Sparkles from './components/Sparkles'

export default function ToyLayer() {
    return (
        <div className="storybook-backdrop" aria-hidden="true">
            <Sparkles />
            <div className="sky-gradient" />
            <div className="rainbow" />
            <div className="sun">
                <span className="sun-ring sun-ring-1" />
                <span className="sun-ring sun-ring-2" />
                <span className="sun-ring sun-ring-3" />
            </div>
            <div className="cloud cloud-left" />
            <div className="cloud cloud-right" />
            <div className="cloud cloud-mid" />
            <span className="bird bird-1" />
            <span className="bird bird-2" />
            <span className="bird bird-3" />
            <span className="bird bird-4" />
            <span className="butterfly" />
            <div className="balloon balloon-1" />
            <div className="balloon balloon-2" />
            <div className="balloon balloon-3" />
            <div className="garden-meadow" />
            <div className="garden-ridge" />
            <div className="tree tree-left">
                <span className="trunk" />
                <span className="canopy" />
            </div>
            <div className="tree tree-mid-left">
                <span className="trunk" />
                <span className="canopy" />
            </div>
            <div className="tree tree-mid-right">
                <span className="trunk" />
                <span className="canopy" />
            </div>
            <div className="tree tree-right">
                <span className="trunk" />
                <span className="canopy" />
            </div>
            <div className="ground-animal bunny bunny-left">
                <span className="ear ear-left" />
                <span className="ear ear-right" />
                <span className="tail" />
            </div>
            <div className="ground-animal fox fox-right">
                <span className="ear ear-left" />
                <span className="ear ear-right" />
                <span className="tail" />
            </div>
            <div className="ground-animal turtle turtle-mid-left">
                <span className="shell" />
                <span className="head" />
                <span className="leg leg-1" />
                <span className="leg leg-2" />
                <span className="leg leg-3" />
                <span className="leg leg-4" />
            </div>
            <div className="ground-animal hedgehog hedgehog-mid-right">
                <span className="spines" />
                <span className="nose" />
                <span className="foot foot-left" />
                <span className="foot foot-right" />
            </div>
            <div className="flower flower-1" />
            <div className="flower flower-2" />
            <div className="flower flower-3" />
            <div className="toy-block toy-block-left">A</div>
            <div className="toy-block toy-block-right">B</div>
            <div className="toy-ball toy-ball-left" />
            <div className="toy-ball toy-ball-right" />
            <div className="ground-mist" />
        </div>
    )
}
