{ pkgs }: {
    deps = with pkgs; [
        nodejs-18_x
        nodePackages.npm
    ];
} 