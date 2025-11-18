const BadgeIcon = ({ badge, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const rarityClasses = {
    common: 'badge-common',
    rare: 'badge-rare',
    epic: 'badge-epic',
    legendary: 'badge-legendary'
  };

  return (
    <div
      className={`${sizeClasses[size]} ${rarityClasses[badge.rarity]} rounded-full flex items-center justify-center font-bold text-2xl`}
      title={badge.description}
    >
      {badge.icon || '🏆'}
    </div>
  );
};

export default BadgeIcon;
