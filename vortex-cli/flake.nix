{
  description = "Browse YouTube from your terminal with vortex-cli";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    { nixpkgs, flake-utils, self, ... }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
      deps = with pkgs; [
        yt-dlp
        jq
        fzf
        mpv
        ffmpeg
        gum
      ];
    in
    {
      packages = {
        default = self.packages.${system}.vortex-cli;
        vortex-cli = pkgs.callPackage ./default.nix { };
      };

      devShells.default = pkgs.mkShellNoCC {
        packages = deps;
      };
    });
}
