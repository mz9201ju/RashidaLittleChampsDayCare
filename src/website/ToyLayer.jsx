export default function ToyLayer() {
    return (
        <div className="storybook-backdrop" aria-hidden="true">
            <div className="sky-gradient" />
            <div className="sun" />
            <div className="cloud cloud-left" />
            <div className="cloud cloud-right" />
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
        </div>
    )
}
