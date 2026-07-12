"use client"

interface ViewToggleOption<T extends string> {
    value: T
    label: string
}

interface ViewToggleProps<T extends string> {
    currentValue: T
    options: readonly ViewToggleOption<T>[]
    onChange: (value: T) => void
    className?: string
    ariaLabel?: string
}

export function ViewToggle<T extends string>({
    currentValue,
    options,
    onChange,
    className = "",
    ariaLabel,
}: ViewToggleProps<T>) {
    if (options.length === 0) {
        return null
    }

    const currentIndex = options.findIndex((option) => option.value === currentValue)
    const safeIndex = currentIndex >= 0 ? currentIndex : 0
    const currentOption = options[safeIndex]
    const nextOption = options[(safeIndex + 1) % options.length]

    const handleClick = () => {
        onChange(nextOption.value)
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className={className}
            aria-label={ariaLabel ?? `Switch to ${nextOption.label} view`}
        >
            <span className="bracket-interactive">
                <span className="bracket-accent">[</span>
                <span className="bracket-content">{`${currentOption.label.toUpperCase()} MODE`}</span>
                <span className="bracket-accent">]</span>
            </span>
        </button>
    )
}
